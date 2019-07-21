import React, { Component } from 'react';

import { Menu, Icon } from 'antd';
import 'antd/lib/menu/style/css';
import 'antd/lib/icon/style/css';


const divStyle = {
  color: 'red',
  backgroundImage: 'url(../bgpng.png)'
  // 或者 background: `url${require("1.jpg")}`
};

class HomePage extends Component {
  state = {

  };

  render() {
    return (
      
      <div>        
        


        {/* <div>
        <div style={divStyle}>Hello World!</div>
          <div style={{  background: '../bgpng.png',padding: '30px' }}>
          </div>
        </div> */}

{/* 背景图片 */}
        
        <img src={require('../images/bg.jpg')} alt="" width="95%" style={{opacity: 0.85}}/>
        <br/><br/>
        <br/><br/>
{/* 项目背景 */}
        {/* <div style={{background:'#45E8CA',opacity: 0.7}}>
          <b><h1>项目介绍</h1></b>
        </div> */}
        <div style={{background:'#ECECEC', padding: '60px' }}>
        <div style={{background:'#45E8CA',opacity: 0.85}}>
          <b><h1>项目背景</h1></b>
        </div>
        <p align="left" style={{fontSize:'18px'}} >闪电保险项目是一款利用人工智能技术进行快速、准确核保，利用区块链技术确认合作与利益分配关系、加强企业间互信的保险平台，是一款利用先进计算机科研技术的金融科技产品。</p>
        <p align="left" style={{fontSize:'18px'}} >冗长的保险审核流程，对于遭受意外损失的投保人来说是一个漫长痛苦的过程。闪电保险平台能够在分钟级完成对投保人的核保、赔保业务，大幅增进用户体验，进而增强投保人信任度与购买量，促进我国保险行业增长。目前应用场景有交通事故快速理赔等。</p>
        <p align="left" style={{fontSize:'18px'}} >团队由中央财经大学学生构成，团队来源于信息学院、保险学院、统计与数学学院等部门，具有跨领域研发能力。团队在人工智能和区块链技术两方面都拥有技术积累。产品仍处于研发期，目前已经完成原型开发。</p>
        <div style={{background:'#45E8CA',opacity: 0.85}}>
          <b><h1>主营业务</h1></b>
        </div>
        <p align="left" style={{fontSize:'18px'}}>1.创业发展期：提供多品种创新型保险服务。</p>
        <p align="left" style={{fontSize:'18px'}}>项目发展早期，团队将利用技术优势建立与知名保险企业的合作关系，学习大型保险公司的成熟运营模式，共同推出创新性保险服务，如闪赔汽车险、闪赔工伤险等，与大型企业共享保险营销收益。</p>
        <p align="left" style={{fontSize:'18px'}}>2.创业成熟期：构建智能快速赔保保险平台。</p>
        <p align="left" style={{fontSize:'18px'}}>随着项目发展，闪电保险平台对于入驻企业和消费者的知名度与信任感将会逐步上升。闪电保险平台将会多家保险设计公司、人工智能科技公司、市场监管部门进行商谈，利用联盟链的合作架构搭建可信企业合作联盟，以平台服务手续费为主要盈利模式。</p>
        <img src={require('../images/qcbx.jpg')} alt="" width="55%" style={{opacity: 0.95}}/>
        <br/><br/><br/>
        <div style={{background:'#45E8CA',opacity: 0.85}}>
          <b><h1>项目团队</h1></b>
        </div>
        <p align="left" style={{fontSize:'18px'}}>“中财繁星”团队由中央财经大学杰出出国毕业生牵头发起，优秀在校学生协同组织研发，团队共计18人。团队核心成员分布于美国卡耐基梅隆大学硅谷校区、美国斯坦福大学、英国伦敦、瑞士苏黎世联邦理工大学、新加坡南洋理工大学、澳大利亚新南威尔士大学（UNSW）、中国北京等地区。团队拥有强大的工程开发能力、科研创新能力，丰富的创新创业竞赛经历、学生工作经历和良好的团队氛围。</p>
        <p align="left" style={{fontSize:'18px'}}>工程能力方面：</p>
        <p align="left" style={{fontSize:'18px'}}>团队完成如金融领域、智能化医疗领域、社交领域、教育领域、多媒体娱乐领域、公益领域等信息项目15项，产品形式包括Web网页、微信小程序、APP等。团队具有丰富的前端开发、后端服务器搭建经历，能够独立完成高质量、高性能信息化产品。</p>
        <p align="left" style={{fontSize:'18px'}}>科研能力方面：</p>
        <p align="left" style={{fontSize:'18px'}}>团队在多个国际会议上，已发表英文论文4篇，在投1篇，改稿中3篇。团队研究领域包括人工智能计算机视觉、区块链开发、数据挖掘与分析等主题，涉及信息智能、金融科技等交叉方向。团队核心成员曾有美国伯克利大学交换生、清华网络空间与网络科学研究院实习生、商汤科技研究员、火币天下研究院实习生等经历，团队成员在美国大学生数学建模比赛中，曾获奖特等奖（OutstandingAwards,top15/8000+）一人次，特等奖提名（FinalistAwards,top30/8000+）一人次。</p>
        <p align="left" style={{fontSize:'18px'}}>创新创业竞赛方面：</p>
        <p align="left" style={{fontSize:'18px'}}>团队获中央财经大学大学生创新创业国家级训练立项项目2项，中央财经大学2018年“挑战杯”创新创业大赛一等奖，电子商务“创新创业创意”大赛中央财经大学一等奖，2018年“互联网+”创新创业大赛北京赛区二等奖。团队热衷于参加创客马拉松大赛，在杭州、上海、北京等地，如“区块链+人工智能保险平台”、“Bancor协议实现数字货币交易所”、“区块链+恋爱社交平台”等代表作曾获得多家知名企业投资意愿。</p>
        {/* <p align="left" style={{fontSize:'18px'}}></p>
        <p align="left" style={{fontSize:'18px'}}></p>
        <p align="left" style={{fontSize:'18px'}}></p>
        <p align="left" style={{fontSize:'18px'}}></p>
        <p align="left" style={{fontSize:'18px'}}></p>
        <p align="left" style={{fontSize:'18px'}}></p>
        <p align="left" style={{fontSize:'18px'}}></p>
        <p align="left" style={{fontSize:'18px'}}></p> */}
      </div>


{/* 视频播放 */}
    <div style={{background:'#45E8CA',opacity: 0.85}}>
          <b><h1>功能介绍</h1></b>
        </div>
        <div>
          <div style={{padding: '60px'}}>
          <p style={{fontSize:'18px'}}>“闪电保险”系统流程图</p>
          </div>
       
        <img src={require('../images/xtlct.png')} alt="" width="55%" style={{opacity: 0.95}}/>
        </div>
        <div align="left">
          <h2><b style={{  background: '#ECECEC'}}></b></h2>
          <br/>
        </div>
        <div color='red' style={{opacity: 0.85}}>
          <b><h1>点击视频了解更多</h1></b>
        </div>
        <video width="60%" height="440" controls="controls" autoplay="autoplay">
          <source src="../demo.mp4" type="video/mp4" />
          <source src="/i/movie.mp4" type="video/mp4" />
          <source src="/i/movie.webm" type="video/webm" />
        </video>

{/* 平台特色 */}
<div style={{background:'#45E8CA',opacity: 0.85}}>
          <b><h1>平台特色</h1></b>
        </div>
        <p style={{fontSize:'18px'}}><b>1.快。无人工，全智能，闪电赔付</b></p>
        <img src={require('../images/sd.png')} alt="" width="55%" height = "440" style={{opacity: 0.95}}/>
        
        <p style={{fontSize:'18px'}}><br/><b>2.稳，可信度高。区块链技术提供充足保障</b></p>
        <img src={require('../images/jg.png')} alt="" width="55%" height = "440"/>

        <div style={{background:'#45E8CA',opacity: 0.85}}>
        <br/>
        <h2><b>欢迎体验“闪电保险”平台，下一代智能保险平台</b></h2>
        <br/>
        <h3><b>本平台集成区块链与人工智能技术，目标是快速实现验证保险服务</b></h3>
        <br/><br/>
        </div>
      </div>
    );
  }
}

export default HomePage;