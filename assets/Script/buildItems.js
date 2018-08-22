import global from './global'
const buildItemState={
    Invalid: -1,//不可用
    Building:1,//建造
}
cc.Class({
    extends: cc.Component,

    properties: {
        buildItem:{
           default:null,
           type:cc.Node
        },
        buildSpriteFrame:{
            default:[],
            type:cc.SpriteFrame
        }
    },
    onLoad:function(){
        this.buildItem.getComponent(cc.Sprite).spriteFrame=this.buildSpriteFrame[0];
        global.event.on("buildItemBreak",this.buildItemBreak.bind(this));
    },
    buildDataIni:function(){
        this.setBuildState(buildItemState.Invalid);
        return this.state;
    },

    buttonClick:function(){
        global.event.fire("setBtnPos",this.node);
    },
    
    setBuildState:function(state){
        if(this.state===state){
            return;
        }
        switch(state){
            case buildItemState.Invalid:
                break;
            case buildItemState.Building:
                break;
            default:
                break;
        }
        this.state=state;
    },
    getBuildState:function(){
        return this.state;
    },
    sureBtn:function(){
        this.setBuildState(buildItemState.Building);
    },
    buildItemBreak:function(){
        if(this.node!=null){
            this.buildItem.getComponent(cc.Sprite).spriteFrame=this.buildSpriteFrame[1];
        }    
    }
   
});
