cc.Class({
    extends: cc.Component,

    properties: {
        cloudNodes:{
            default:[],
            type:cc.Node
        }
    },
    onLoad:function(){
        cc.director.preloadScene("game", ()=>{
            cc.log("Next scene preloaded");
        });
    },
    buttonClick:function(){      
        cc.director.loadScene("game");
    }

    
    
});
