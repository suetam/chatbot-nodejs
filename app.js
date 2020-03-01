require('dotenv').config();
const prompt = require('prompt-sync')();
const watson = require('watson-developer-cloud/assistant/v1');
const ASSISTANT_IAM_URL = process.env.ASSISTANT_IAM_URL;
const ASSISTANT_IAM_APIKEY = process.env.ASSISTANT_IAM_APIKEY;
const WORKSPACE_ID = process.env.WORKSPACE_ID;
const VERSION = process.env.VERSION;


const chatbotA = new watson({
    'version' : VERSION,
    'url': ASSISTANT_IAM_URL || '<url>',
    'iam_apikey' : ASSISTANT_IAM_APIKEY || '<iam_apikey>',
    'iam_url' : 'https://iam.bluemix.net/identity/token'    
});



//helptech 3f4415a3-0354-4680-ab39-fde0961f27d1
//pizzaria c5a168fb-e87f-4414-a43c-5b5242d5a003
var payload = {
    workspace_id : WORKSPACE_ID,
    context : {},
    input : {}
};


//começar a conversação com uma mensagem vazia
chatbotA.message(payload, function trataResposta(err, resposta){
    let fimDeConversa = false;
    
    if (err){
        console.log(err);
        return;
    };
    //console.log(resposta);
    
    //detecta intenção do usuario
    if (resposta.intents.length > 0){
        console.log('Eu detectei uma intenção: ' + resposta.intents[0].intent);
        
        if (resposta.intents[0].intent == 'Despedida'){
            fimDeConversa = true;
        }
    }

    //exibe a resposta do dialogo, caso haja
    if (resposta.output.text.length > 0){
        
        console.log(resposta.output.text[0]);
    }

    //console.log(resposta.context);

    if (!fimDeConversa){
        const mensagemUsuario = prompt('>>');
        chatbotA.message({
            workspace_id : WORKSPACE_ID,
            context : resposta.context,
            input :{text: mensagemUsuario}
        }, trataResposta)    
    };
});

/*chatbotA.message({workspace_id}, trataResposta);


function trataResposta(err, resposta){
    if (err){
        console.log(err);
        return;
    };
    //console.log("mateus teste");
    console.log(resposta);

    //exibe a resposta do dialogo, caso haja
    if (resposta.output.text.length > 0){
        console.log(resposta.output.text)
    }
}
*/