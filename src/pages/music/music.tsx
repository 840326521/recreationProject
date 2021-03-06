import React, { useCallback } from "react";
import { View } from "@tarojs/components";
import { useEnv, useNavigationBar, useModal, useToast } from "taro-hooks";

const Index = () => {
  const env = useEnv();
  // const [, { setTitle }] = useNavigationBar({ title: "Taro Hooks" });
  const [show] = useModal({
    title: "Taro Hooks!",
    showCancel: false,
    confirmColor: "#8c2de9",
    confirmText: "支持一下",
    mask: true
  });
  const [showToast] = useToast({ mask: true });

  const msg = `
  \u3000\u3000安林站在高楼顶端
，迎面吹来喧嚣的风。<br/><br/>\u3000\u3000他望向身后，那里有一群面目凶煞的男子，正慢慢地围了上来。<br/><br/>\u3000\u3000“嘿嘿嘿，臭小子，这回看你还怎
么跑，有种你飞上天啊！”为首的壮汉拿着一个铁棒，脸上浮现出残忍的神色。<br/><br/>\u3000\u3000安林知道他现在已经没有逃跑的机会了，可是一想到被抓回去的下
场，他的身子就忍不住地颤抖，那种生活简直不是人过的！<br/><br/>\u3000\u3000怎么办，怎么办，要是我能飞就好了……<br/><br/>\u3000\u3000安林心中如此想着，然
后一阵飓风在天地之间出现，将他的身子卷起。<br/><br/>\u3000\u3000“诶，诶，诶？”<br/><br/>\u3000\u3000安林心中惊骇，他真的飞起来了，被风吹得飞起来了！<br/><br/>\u3000\u3000“卧槽！他丫的真能飞？”为首的壮汉见到这一幕，也变得目瞪口呆起来。<br/><br/>\u3000\u3000安林当着众人的面，被飓风托着飞出了楼顶。<br/><br/>\u3000\u3000然后，风消失了，他开始了自由落体……<br/><br/>\u3000\u3000“啊啊啊啊啊……救命啊！”<br/><br/>\u3000\u3000狂风呼啸，那种急剧下坠的失重感，
吓得安林尖叫了起来。<br/><br/>\u3000\u3000要死了！要死了！要死了！<br/><br/>\u3000\u3000安林心中不断咆哮。<br/><br/>\u3000\u3000那种死亡即将来临的恐惧
笼罩着全身，让他身体的每一个部位都禁不住的颤抖。<br/><br/>\u3000\u3000楼顶上，壮汉一脸懵逼地望着安林自由落体，随后，他转身对众人缓缓开口道：“那啥，那
小子可不是被我逼得去跳楼的，凶手是‘风’，你们可得替我作证……”<br/><br/>\u3000\u3000身后的众人也是在原地发呆，这风来得太诡异了，说出去有人信吗，别说其他
人了，他们亲眼看见了都无法相信！<br/><br/>\u3000\u3000安林望着越来越近的地面，绝望地闭上了眼睛，没想到自己的一生，竟然如此窝囊地结束了。<br/><br/>\u3000\u3000就在这时，神秘的白色光团忽然出现，然后包裹住他的全身。<br/><br/>\u3000\u3000可怕的超重感也在这一刻传来，然后他感觉自己就像坐过山车那般，冲到底
端，然后绕了一个弧度，飞了上天。<br/><br/>\u3000\u3000“啊啊啊……”<br/><br/>\u3000\u3000安林又尖叫起来，他的身子飞向了天空之后，重新落在楼顶之上。<br/><br/>\u3000\u3000那种无比剧烈的超重失重，还有生死交替的感觉，让他感到头部一阵晕眩，接着不争气地吐了起来。<br/><br/>\u3000\u3000“喂喂，小伙子，好点了吗
？”就在这时，一个缥缈的声音传到安林耳边。<br/><br/>\u3000\u3000他抬头，发现一名老者正满脸慈爱的看着自己。<br/><br/>\u3000\u3000老者的身后，那些来前抓
他的凶煞男子，已经全部晕倒在地面之上。<br/><br/>\u3000\u3000老者须发皆白，仙风道骨，全身金色仙气萦绕，一副圣洁无暇的模样。<br/><br/>\u3000\u3000见到这
一幕，安林全身一震，无数的情节涌上心头。<br/><br/>\u3000\u3000小说的，动漫的，影视的……<br/><br/>\u3000\u3000种种情节开始浮现在他的脑海里，那一切梦幻的
开端，不就是眼前这一幕吗！<br/><br/>\u3000\u3000噗通！<br/><br/>\u3000\u3000安林重重磕头，热泪盈眶道：“仙人，谢谢您救了我！”<br/><br/>\u3000\u3000被安
林喊作仙人的老者，轻抚着白色胡须，微微一笑道：“刚刚施法有些失误，吓到小友了。话说这群人为何要追小友啊？”<br/><br/>\u3000\u3000安林闻言一愣，施法失误？
原来他刚刚被风吹起来是仙人的锅？<br/><br/>\u3000\u3000不过仙人好歹救了他，听到仙人的问话后，无数的委屈涌上心头，他开口道：<br/><br/>\u3000\u3000“事情
是这样的，我母亲去世后，父亲染上嗜赌的毛病。”<br/><br/>\u3000\u3000“他把房子赌没了，又欠下了几百万赌债无力偿还，然后一个人跑了！”<br/><br/>\u3000\u3000“我好不容易考上了华清大学，这时债主却找到了我，说要我父债子还……”<br/><br/>\u3000\u3000“几百万啊！我拿什么去还？”<br/><br/>\u3000\u3000“女朋友听说我欠
下巨债，跟高富帅跑了。”<br/><br/>\u3000\u3000“我被迫离开了学校，去给债主当苦力。”<br/><br/>\u3000\u3000“然而，那种苦力简直不是人干的，我实在忍受不了，
所以才试图逃跑。之后，债主派了一群人来抓我，这才有了之前发生的事情，”<br/><br/>\u3000\u3000安林一把鼻涕一把泪地倾诉着，只觉人生一片灰暗。<br/><br/>\u3000\u3000一辈子都在还债的人生，和咸鱼又有什么区别。<br/><br/>\u3000\u3000那名仙人听完安林的经历后，眼中亦有着同情的神色，他缓缓开口：“小伙子，你的命真
苦啊……这样吧，你我相逢即是有缘，而且我看你资质绝佳，不如就让本仙送你一套‘系统’，让你去改变你的人生吧。”<br/><br/>\u3000\u3000安林闻言浑身一颤，他本以
为能和仙人结下仙缘，已是大幸，却没想到仙人出手如此阔绰，竟然一见面就送系统！<br/><br/>\u3000\u3000“仙人老爷爷，您对我真的是太好了！我实在是不知道该怎
么去报答您了！”安林热泪盈眶地看着眼前这名老者，十分的感动。<br/><br/>\u3000\u3000仙人慈爱一笑，掌心向天，紧接着一颗纯白至极的光球，出现在了他的掌心。<br/><br/>\u3000\u3000“小伙子，你过来，把这个光球握在手心。”仙人对安林说道。<br/><br/>\u3000\u3000闻言，安林迫不及待地握住光球。<br/><br/>\u3000\u3000
光球在他的手中，散发出一丝丝的暖流，球中所流露出的光芒，更是柔和至极。<br/><br/>\u3000\u3000“启动系统移接。”仙人缓缓说道。<br/><br/>\u3000\u3000仙人话
语刚落，白色光球上的光芒大盛！<br/><br/>\u3000\u3000就在这时，仙人对安林说道：“小伙子，你快起誓，发誓接受这个战神系统，一生不离不弃！”<br/><br/>\u3000\u3000战神系统？<br/><br/>\u3000\u3000好霸气的名字！<br/><br/>\u3000\u3000不过这誓言怎么像是结婚宣言？<br/><br/>\u3000\u3000来不及多想，安林急忙说道：
“我发誓，接受战神系统，一生不离不弃！”<br/><br/>\u3000\u3000安林的誓言刚说完，光球便嗖地一声，直接撞进他的身体，和他融为了一体。<br/><br/>\u3000\u3000紧接着，有声音在他的脑海中响起：“检测宿主为天冥道体质，符合资质，系统开始融合！”<br/><br/>\u3000\u3000安林很激动，激动到想哭。<br/><br/>\u3000\u3000原
本以为自己的人生是灰暗的，却没想到峰回路转，竟然在此刻迎来了开挂系统的人生！<br/><br/>\u3000\u3000仙人也很激动，而且激动到已经哭了！<br/><br/>\u3000\u3000他仰望着天空，老泪纵横，跪倒在地上，最后竟是又哭又笑道：“哈哈哈哈哈，你终于滚蛋了，我终于获得新生啦！”<br/><br/>\u3000\u3000“仙人老爷爷，你怎么了
，没事吧？”见到老者举止奇怪，安林有些关切地问道。<br/><br/>\u3000\u3000仙人回过神来，抹了抹眼泪，知道自己失态了。<br/><br/>\u3000\u3000“没事，本仙只是
想到了一些不堪回首的往事……”<br/><br/>\u3000\u3000“小伙子，得到了系统后，你要好好加油啊。”仙人语重心长道。<br/><br/>\u3000\u3000“嗯！我会的！”安林重重
点头。<br/><br/>\u3000\u3000“那么，你想去学校修仙吗？我知道一所比较不错的学校。”仙人接着开口。<br/><br/>\u3000\u3000去学校修仙？傻子才会拒绝好吧！<br/><br/>\u3000\u3000“想啊，我特别想去！”安林几乎是想都没想一下，便开口回答道。<br/><br/>\u3000\u3000仙人闻言欣慰一笑，从衣袖内掏出了一张金色的纸张递给安
林，然后说道：“这是我的举荐函，你有了它，便可以去修仙联合大学学习，正式踏上修仙之路了。”<br/><br/>\u3000\u3000安林心下一惊，敢情这修仙龙傲天的道路，仙
人都为自己铺好了！<br/><br/>\u3000\u3000他郑重接过仙人给自己的举荐函，一脸感激地看着仙人。<br/><br/>\u3000\u3000“不知仙人爷爷，您的名字叫什么？”<br/><br/>\u3000\u3000“名字嘛……还是不说了吧。”仙人轻抚着安林的头顶，脸上有着同情的神色。<br/><br/>\u3000\u3000“我得走了，小伙子再见。”<br/><br/>\u3000\u3000仙人挥手向安林告别，随后便腾云驾雾而去。<br/><br/>\u3000\u3000“仙人您慢走！”安林对着飞向天空的仙人感激一拜。<br/><br/>\u3000\u3000天上传来仙人的笑声，
那笑声无比畅快，无比肆意，仿佛倾吐出了一生的不平之气。<br/><br/>\u3000\u3000这仙人为何如此的高兴啊，怎么感觉比我还高兴？<br/><br/>\u3000\u3000安林挠了
挠头，一脸不解。<br/><br/>\u3000\u3000就在这时，一个女声在安林的意识中响起：“你好。”<br/><br/>\u3000\u3000这女声美妙动听，如同天籁，听得他浑身一个机灵
。<br/><br/>\u3000\u3000这是系统的声音？安林惊疑不定。<br/><br/>\u3000\u3000就在这时，他的脑海中出现了一个界面。<br/><br/>\u3000\u3000界面一片灰白，只
有几个字在上面显示：战神系统将在进入太初大陆后激活。<br/><br/>\u3000\u3000太初大陆是什么鬼？<br/><br/>\u3000\u3000难道是……<br/><br/>\u3000\u3000安林想
到了仙人给的举荐函，他满怀期待地将手中的金色纸张摊开。<br/><br/>\u3000\u3000接着，他发现金色纸张内什么内容都没有，只有一个微微凹陷的手印。<br/><br/>\u3000\u3000安林有些不明所以，但是仍是顺势将自己的手放在纸张之上，和那个手印重合。<br/><br/>\u3000\u3000忽然，纸张金光大盛，安林只来得及惊咦一声，身体便
被着那道金光完全吞噬。<br/><br/>\u3000\u3000“啊……！”<br/><br/>\u3000\u3000安林只觉一阵天旋地转，视野便由漆黑，再次变得明亮。<br/><br/>\u3000\u3000然后
他发现，自己的身子再次出现在高空，开始了自由落体。<br/><br/>\u3000\u3000安林又一次体会了跳楼的感觉，那种酸爽无论来几次，他都想掉眼泪。<br/><br/>\u3000\u3000“轰”<br/><br/>\u3000\u3000他重重摔落地面，幸好他的身上还有金光笼罩，起到了缓冲的作用，这才保住了小命。<br/><br/>\u3000\u3000“这是传送的招式吗，
也太粗暴吧！”安林趴在地上，不满抱怨。<br/><br/>\u3000\u3000他有些艰难的抬起头，想看看这是哪里。<br/><br/>\u3000\u3000然后，他看到了永生难忘的一幕。<br/><br/>\u3000\u3000两根高达百丈的白色纹龙门柱，伫立在天际之间，牌匾之上刻着他看不懂的玄妙字体。<br/><br/>\u3000\u3000大门之后，宫殿千千万万，看不到尽
头。<br/><br/>\u3000\u3000彩云飘荡在宫殿的四周，各种灵兽翱翔于天地之间，一派宏大壮阔的仙家气象。<br/><br/>\u3000\u3000安林呆立在原地，满脸震惊的神色。
<br/><br/>\u3000\u3000原来这个世界，真的有仙境！<br/><br/>\u3000\u3000我来到仙境了么......安林努力平复情绪，让自己冷静下来。<br/><br/>\u3000\u3000过了
片刻，他看见一名穿着道袍的女子走来，连忙上去打招呼了解情况。<br/><br/>\u3000\u3000“你好，仙女姐姐。”安林向那女子招手。<br/><br/>\u3000\u3000那名容貌美
丽的女子，见到安林在向她招手后，便走了过来。<br/><br/>\u3000\u3000安林见状有些激动地问道：“这位漂亮的仙女姐姐，请问这里是什么地方，我初来乍到，对这个
地方不是很懂呢。”<br/><br/>\u3000\u3000听到安林的话，那名女子神色有些古怪，然后说道：“叽里咕噜？”<br/><br/>\u3000\u3000“啊，你说什么？”安林有些不解。<br/><br/>\u3000\u3000那名女子露出了和安林同样的表情，开口道：“叽里咕噜哇咧叽里？”<br/><br/>\u3000\u3000安林在这一刻蒙了，她到底在说什么？<br/><br/>\u3000\u3000一个可怕的猜想，渐渐出现在他的脑海。<br/><br/>\u3000\u3000“仙女姐姐，你会不会说普通话啊？”安林眼眶有些湿润。<br/><br/>\u3000\u3000“咕噜咕噜哇
唧唧唧？”美丽的女子双手叉腰，有些生气。<br/><br/>\u3000\u3000完了，语言不通。<br/><br/>\u3000\u3000她到底在说什么？我完全听不懂啊！！！<br/><br/>\u3000\u3000安林这回是彻底懵逼了，他双目呆滞地站在原地，心中只有一个念头：<br/><br/>\u3000\u3000纳尼？这和小说里说的不一样啊，不应该是全世界都在说普通话的
吗……<br/><br/>\u3000\u3000最后，安林哭了。<br/><br/>\u3000\u3000话都听不懂，这仙还怎么修？<br/><br/>\u3000\u3000别人是从废材起步，他是从智障起步啊！<br/><br/>'
`;

  const handleModal = useCallback(() => {
    show({
      content: "不如给一个star⭐️!",
      cancelColor: "orange",
      cancelText: "取消"
    }).then(() => {
      console.log("哈哈");
      showToast({ title: "点击了支持!", duration: 2000 });
    });
  }, [show, showToast]);

  return (
    <View
      className="wrapper"
      onClick={handleModal}
      dangerouslySetInnerHTML={{ __html: msg }}
    >
      {/* <Image className="logo" src={logo} />
      <Text className="title">为Taro而设计的Hooks Library</Text>
      <Text className="desc">
        目前覆盖70%官方API. 抹平部分API在H5端短板. 提供近40+Hooks!
        并结合ahook适配Taro!
      </Text>
      <View className="list">
        <Text className="label">运行环境</Text>
        <Text className="note">{env}</Text>
      </View>
      <Button className="button" onClick={() => setTitle("Taro Hooks Nice!")}>
        设置标题
      </Button>
      <Button className="button" onClick={handleModal}>
        使用Modal
      </Button> */}
    </View>
  );
};

export default Index;
