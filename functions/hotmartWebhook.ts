import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        
        // Obter o token Hottok do header para validação
        const hottok = req.headers.get('X-Hotmart-Hottok');
        const expectedHottok = Deno.env.get('HOTMART_HOTTOK');
        
        // Validar o token Hottok
        if (!hottok || hottok !== expectedHottok) {
            return Response.json(
                { error: 'Token Hottok inválido' }, 
                { status: 401 }
            );
        }
        
        // Ler o payload do webhook
        const payload = await req.json();
        
        console.log('Hotmart webhook recebido:', JSON.stringify(payload, null, 2));
        
        // Extrair dados relevantes do webhook
        const event = payload.event;
        const data = payload.data;
        
        // Processar apenas eventos de compra aprovada
        if (event === 'PURCHASE_APPROVED' || event === 'PURCHASE_COMPLETE') {
            const buyerEmail = data.buyer?.email;
            const transactionCode = data.purchase?.transaction;
            
            if (!buyerEmail) {
                console.log('Email do comprador não encontrado no webhook');
                return Response.json({ message: 'Email não encontrado' }, { status: 400 });
            }
            
            console.log(`Processando compra aprovada para: ${buyerEmail}`);
            
            // Buscar o perfil do usuário pelo email usando service role
            const profiles = await base44.asServiceRole.entities.UserProfile.filter({
                created_by: buyerEmail
            });
            
            let profile;
            
            if (profiles.length === 0) {
                console.log(`Perfil não encontrado para o email: ${buyerEmail}. Criando novo perfil...`);
                
                // Criar novo perfil para o comprador
                const buyerName = data.buyer?.name || 'Novo Usuário';
                profile = await base44.asServiceRole.entities.UserProfile.create({
                    nome: buyerName,
                    tem_plano_personalizado: true,
                    hotmart_transaction_code: transactionCode,
                    created_by: buyerEmail
                });
                
                console.log(`Novo perfil criado e acesso concedido para: ${buyerEmail}`);
            } else {
                profile = profiles[0];
                
                // Atualizar o perfil existente para conceder acesso ao plano
                await base44.asServiceRole.entities.UserProfile.update(profile.id, {
                    tem_plano_personalizado: true,
                    hotmart_transaction_code: transactionCode
                });
                
                console.log(`Acesso ao plano concedido para usuário existente: ${buyerEmail}`);
            }
            
            // Opcional: Enviar email de confirmação
            // await base44.asServiceRole.integrations.Core.SendEmail({
            //     to: buyerEmail,
            //     from_name: 'Jhony Bosio',
            //     subject: 'Bem-vindo ao Plano Personalizado!',
            //     body: `Olá ${profile.nome},\n\nSeu pagamento foi confirmado! Seu plano personalizado já está disponível na área logada.\n\nAcesse agora e comece sua jornada!\n\nJhony Bosio`
            // });
            
            return Response.json({ 
                message: 'Compra processada com sucesso',
                email: buyerEmail 
            }, { status: 200 });
        }
        
        // Outros eventos (reembolso, cancelamento, etc.)
        if (event === 'PURCHASE_REFUNDED' || event === 'PURCHASE_CANCELED') {
            const buyerEmail = data.buyer?.email;
            
            if (buyerEmail) {
                const profiles = await base44.asServiceRole.entities.UserProfile.filter({
                    created_by: buyerEmail
                });
                
                if (profiles.length > 0) {
                    await base44.asServiceRole.entities.UserProfile.update(profiles[0].id, {
                        tem_plano_personalizado: false
                    });
                    console.log(`Acesso removido para: ${buyerEmail}`);
                }
            }
        }
        
        return Response.json({ message: 'Webhook recebido' }, { status: 200 });
        
    } catch (error) {
        console.error('Erro ao processar webhook Hotmart:', error);
        return Response.json({ 
            error: 'Erro ao processar webhook',
            details: error.message 
        }, { status: 500 });
    }
});