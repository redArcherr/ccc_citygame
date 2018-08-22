import global from './global'
const groundState={
    Invalid: -1,//不可用
    Usable:1,//可用
}
cc.Class({
    extends: cc.Component,

    properties: {
       label:{
           default:null,
           type:cc.Label
       },
       buildSprite:{
        default:null,
        type:cc.Sprite
       },
       buildBtnSpriteFrams:{
           default:[],
           type:cc.SpriteFrame
       },
       buildNode:{
           default:null,
           type:cc.Node
       },
    },
    onLoad:function(){
        global.event.on("setGroundState",this.setGround.bind(this));
    },
    buildBtnIni:function(idx,buildItems,grounds){
        cc.loader.loadRes("./buildBtnConfig",(err,result)=>{
            if(err){
                cc.log("load config:"+err);
            }else{
                //this.fatherNode=fatherNode;//获取到root节点
                this.buildItems=buildItems;//获取到root节点上的buildItemPrefabs数组
                this.label.string=result["build_"+idx].name;
                this.buildSprite.spriteFrame=this.buildBtnSpriteFrams[idx];
                this.node.myIdx=idx;
                this.node.name=result["build_"+idx].name;
                this.grounds=grounds;
                this.addTouchEvent(this.node);
            }
        });
    },
    addTouchEvent:function(node){
            let buildItem,buildState;
            node.on(cc.Node.EventType.TOUCH_START,(event)=>{
                node.conutY=event.touch._point.y;
                buildItem=undefined;
                buildState=undefined;
                //this.buildNode.opacity=100;
                //event.stopPropagation();//阻止冒泡
            });
    
            node.on(cc.Node.EventType.TOUCH_MOVE,(event)=>{
                let delta = event.touch.getDelta();
                let Y=Math.floor(event.touch._point.y-node.conutY);
                if(Y>100){
                    //cc.log("可以拖出位置："+Y);
                    node.conutY=9999;
                    let curX=event.getLocation().x;
                    let curY=event.getLocation().y;
                    //global.event.fire("createBuild",node);
                    buildItem=cc.instantiate(this.buildItems[node.myIdx]);
                    buildItem.type=node.myIdx;
                    buildItem.name=node.name;
                    buildState=buildItem.getComponent('buildItems').buildDataIni();
                    //this.buildItem.parent=this.fatherNode;
                    //找到想要绑定的节点
                    let backNode = cc.find("Canvas/root/background/view/content");
                    buildItem.parent=backNode;
                    //把坐标转换成相对于节点的坐标
                    let buildItemPos=backNode.convertToNodeSpaceAR(cc.p(curX,curY));
                    buildItem.setPosition(buildItemPos);
                
                }
                if(buildItem && buildState===-1){
                    buildItem.x += delta.x;
                    buildItem.y += delta.y;
                    
                }   
            });
            //touch_cancel 移动式脱离节点也会执行，touch_end必须在节点内
            node.on(cc.Node.EventType.TOUCH_CANCEL,(event)=>{
                cc.log("end");
                //event.stopPropagation();//阻止冒泡
                if(buildItem){
                    if(!this.countBuildPosition(buildItem)){
                        buildItem.destroy();
                    }
                }
            }); 
            
            node.on(cc.Node.EventType.TOUCH_END,(event)=>{
                if(buildItem){
                    buildItem.destroy();
                }
            })
    },
    countBuildPosition:function(build){
        if(build){
            for(let i=0;i<this.grounds.length;i++){
                let ground=this.grounds[i];
                //计算距离
                let distance=cc.pDistance(ground.position, build.position);
                if(distance<ground.width){
                    if(ground.state===groundState.Usable){ 
                        if(ground.type!=2 && ground.type!=3 && ground.type!=4 && ground.type!=5){
                            if(build.type!=6 && build.type!=7 && build.type!=8 && build.type!=18){
                                build.position=ground.position;
                                build.ground=ground;
                                global.event.fire("setBtnPos",build);
                                //build.getComponent('buildItems').sureBtn();
                                //this.setGroundState(ground,groundState.Invalid);
                                return true;   
                            }else{
                                global.event.fire("callTips",build.name+"不能放在这里");
                            }
                        }
                        //防固坡
                        if(ground.type===2 && build.type===7){
                            build.position=ground.position;
                            build.ground=ground;
                            global.event.fire("setBtnPos",build);
                            return true;  
                        }
                        //挡水墙
                        if(ground.type===4 && build.type===6){
                            build.position=ground.position;
                            build.ground=ground;
                            global.event.fire("setBtnPos",build);
                            return true;  
                        }
                        //防护坡
                        if(ground.type===5 && build.type===8){
                            build.position=ground.position;
                            build.ground=ground;
                            global.event.fire("setBtnPos",build);
                            return true;  
                        }
                        //提坝
                        if(ground.type===3 && build.type===18){
                            build.position=ground.position;
                            build.ground=ground;
                            global.event.fire("setBtnPos",build);
                            return true;  
                        }
                        
                    }else{
                        global.event.fire("callTips","已经被占用");
                    }    
                }
            }
        }
    },
    setGround:function(ground,state){
        if(state==="yes"){
            this.setGroundState(ground,groundState.Invalid);
        }
        if(state==="no"){
            this.setGroundState(ground,groundState.Usable);
        }
    },
    //土地状态机
    setGroundState:function(node,state){
        if(node.state===state){
            return;
        }
        switch(state){
            case groundState.Invalid:
                break;
            case groundState.Usable:
                break;
            default:
                break;
        }
        node.state=state;
    },
});
