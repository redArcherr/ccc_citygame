import global from './global'
cc.Class({
    extends: cc.Component,

    properties: {
       stormNode:{
           default:null,
           type:cc.Node
       }
    },
    onLoad:function(){
        this.node.active=false;
        global.event.on("playAnim",this.animIni.bind(this));
    },
    animIni:function(){
        if(this.node!=null){
            cc.log('接到动画命令');
            //this.node.active=!this.node.active;
            this.node.active=true;
            this.stormNode.opacity=255;
            //定义一个渐隐动画
            let action=cc.fadeOut(1);
            //风暴
            let stormAnimClips=this.stormNode.getComponent(cc.Animation);
            stormAnimClips.play('storm');
            let self=this.stormNode;
            
            setTimeout(function(){
                self.runAction(action);
                cc.log('动画播放结束');
                //stormAnimClips.stop('storm');
            },3000);
        }  
    }  
});
