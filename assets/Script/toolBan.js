import global from './global'
cc.Class({
    extends: cc.Component,

    properties: {
       
    },
    onLoad:function(){
        this.node.x=-1131;
        this.node.y=-398;
        this.setPosLeave();
        global.event.on("setPosCome",this.setPosCome.bind(this));
        global.event.on("setPosLeave",this.setPosLeave.bind(this));
        this.node.on(cc.Node.EventType.TOUCH_START,(event)=>{

        });
        this.node.on(cc.Node.EventType.TOUCH_MOVE,(event)=>{

        });
        this.node.on(cc.Node.EventType.TOUCH_END,(event)=>{

        });
    },
    setPosLeave:function(){
        if(this.node!=null){
            //cc.log("toolBan_111");
            this.node.x=-1708;
            this.node.y=-242;
        }
    },
    setPosCome:function(){
        if(this.node!=null){
            //cc.log("toolBan_ceshi");
            this.node.x=0;
            this.node.y=-420;
        }   
    }
});
