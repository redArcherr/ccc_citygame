cc.Class({
    extends: cc.Component,

    properties: {
        
    },
    buttonClick:function(){
        let posY=this.node.y;
        let action=undefined;
        if(posY>=-454){
            action=cc.moveTo(0.2,cc.v2(0, -587));
            this.node.runAction(action);
        }else{
            action=cc.moveTo(0.2,cc.v2(0, -454));
            this.node.runAction(action);
        }
        
    }
});
