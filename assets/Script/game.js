import global from './global'
cc.Class({
    extends: cc.Component,

    properties: {
        buildBtnPrefab:{
            default:null,
            type:cc.Prefab
        },
        toolScrollView:{
            default:null,
            type:cc.ScrollView
        },
        buildItems:{
            default:[],
            type:cc.Prefab
        },
        groundNodes:{
            default:[],
            type:cc.Node
        },
        tipsNode:{
            default:null,
            type:cc.Node
        },
        controlBtn:{
            default:null,
            type:cc.Node
        }
    },

    onLoad: function () {
        this.tipsNode.opacity=0;
        this.gameInit();
        //global.event.on("createBuild",this.createBuild.bind(this));
        global.event.on("callTips",this.setTipsTxt.bind(this));
        global.event.on("setBtnPos",this.setCtrlBtnPos.bind(this));
        this.node.on(cc.Node.EventType.TOUCH_START,(event)=>{
            cc.log(event.target.myIdx);
        });
    },

    gameInit:function(){
        cc.loader.loadRes('./groundConfig',(err,result)=>{
            if(err){
                cc.log("load config:"+err);
            }else{
                for(let i=0;i<this.groundNodes.length;i++){
                    let ground=this.groundNodes[i];
                    ground.state=1;
                    ground.type=result["ground_"+i].type;
                }
                for(let i=0;i<23;i++){
                    let buildBtn=cc.instantiate(this.buildBtnPrefab);
                    buildBtn.parent=this.toolScrollView.content;
                    buildBtn.getComponent('buildbtn').buildBtnIni(i,this.buildItems,this.groundNodes,this.controlBtn);
                }
            }
        });     
    },

    setTipsTxt:function(data){
        this.tipsNode.opacity=255;
        this.tipsNode.getComponent(cc.Label).string=data;
        let action=cc.fadeOut(2);
        let sequence=cc.sequence(action,cc.callFunc(()=>{
            this.tipsNode.opacity=0;
        }));
        this.tipsNode.runAction(sequence);
    },
    setCtrlBtnPos:function(build){
        if(this.controlBtn!=null){
            this.chose=build;
            this.ground=build.ground;
            this.controlBtn.position=build.position;
            this.controlBtn.y=this.controlBtn.y+build.height/2;
            global.event.fire("setPosCome");
        }  
    },
    buttonClick:function(event,coustomData){
        if(coustomData==="yes"){
            global.event.fire("setGroundState",this.ground,coustomData);
            this.chose.getComponent('buildItems').sureBtn();
        }
        if(coustomData==="no"){
            global.event.fire("setGroundState",this.ground,coustomData);
            this.chose.destroy();
        }
        this.controlBtn.x=-200;
        this.controlBtn.y=400;
        global.event.fire("setPosLeave");
    },
    finishClick:function(){
        let shakeAnim=this.node.getComponent(cc.Animation);
        shakeAnim.play('shake');
        global.event.fire("playAnim");
        global.event.fire("buildItemBreak");
        let self=this.node
        setTimeout(function(){
            shakeAnim.stop('shake');
            self.x=0;
            self.y=0;
            cc.director.loadScene("end");
        },3000);
    },
    update: function (dt) {

    },
});
