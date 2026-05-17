window.GAME_STORY = {
  startNode: "opening",
  initialStats: {
    cover: 6,
    intel: 0,
    conscience: 1,
    suspicion: 1
  },
  nodes: {
    opening: {
      title: "档案打开",
      location: "伦敦，索霍一间出租屋",
      date: "1942年11月3日",
      text: [
        "夜里十一点，窗外没有灯。战时的伦敦把自己藏进厚布和雾里，只剩巡逻靴声在街口回响。",
        "你现在叫 Adrian Vale。这个名字印在配给卡、租房契约和一张足够逼真的工作证上。真正的名字被你留在另一片大陆，和一面你不再愿意直视的旗帜一起。",
        "桌上的信封里只有一句话：北大西洋护航路线，本周内取得。落款是灰鸦。"
      ],
      choices: [
        { label: "把信封烧掉，只记住任务要点。", next: "ash", effects: { cover: 1, conscience: 1 } },
        { label: "反复阅读每个字，确认没有第二层暗号。", next: "ash", effects: { intel: 1, suspicion: 1 } }
      ]
    },
    ash: {
      title: "灰烬",
      location: "伦敦，索霍一间出租屋",
      date: "1942年11月3日",
      text: [
        "纸边卷起，火苗像一条短暂的舌头，把命令吞进铁皮烟灰缸。",
        "你在镜子里练习 Adrian Vale 的表情：疲惫、可靠、对战争只剩沉默。楼下房东太太咳了一声，你立刻停住。这里每一堵墙都像有耳朵。",
        "明天，你要去电报部门附近的茶室。Evelyn Carter 常在那里吃午饭。"
      ],
      choices: [
        { label: "提前睡下，保持伪装稳定。", next: "tea_room", effects: { cover: 1 } },
        { label: "整夜整理她的公开资料和工作习惯。", next: "tea_room", effects: { intel: 1, suspicion: 1 } },
        { label: "写下一句警告自己的话：不要让任务变成借口。", next: "tea_room", effects: { conscience: 1 } }
      ]
    },
    tea_room: {
      title: "茶室里的雨",
      location: "白厅附近的茶室",
      date: "1942年11月4日",
      text: [
        "茶室的玻璃被雨雾糊住，里面的人说话都压着嗓子。Evelyn Carter 坐在靠墙的位置，手边是一份折起的报纸。",
        "你知道她在电报部门做文书整理，也知道她的哥哥在护航船队服役。这个细节让任务忽然变得不那么抽象。",
        "柜台旁有个男人看了你一眼。他的帽檐很低，眼神不像普通顾客。"
      ],
      choices: [
        { label: "礼貌搭话，把自己塑造成普通办事员。", next: "evelyn_intro", effects: { cover: 1, intel: 1 } },
        { label: "保持距离，听她与店员的只言片语。", next: "overheard", effects: { intel: 2, suspicion: 1 } },
        { label: "先离开茶室，确认低帽檐男人是否跟踪。", next: "harris_glimpse", effects: { cover: 1, suspicion: -1 } }
      ]
    },
    evelyn_intro: {
      title: "Evelyn Carter",
      location: "白厅附近的茶室",
      date: "1942年11月4日",
      text: [
        "你问她是否介意拼桌。她抬头看你，眼神里有战时伦敦特有的戒备，却还是点了点头。",
        "你们谈天气、配给、被炸坏的街道。她说她最怕听见电报室里突然安静下来，因为安静通常意味着坏消息正在被确认。",
        "你原本准备好的套话在喉咙里变得沉重。"
      ],
      choices: [
        { label: "继续扮演友善陌生人，慢慢靠近她的工作圈。", next: "ministry_steps", effects: { cover: 1, intel: 1 } },
        { label: "对她哥哥的处境表示真诚关心。", next: "ministry_steps", effects: { conscience: 2, cover: -1 } },
        { label: "刻意提到护航路线，引她露出反应。", next: "ministry_steps", effects: { intel: 2, suspicion: 2 } }
      ]
    },
    overheard: {
      title: "半句闲谈",
      location: "白厅附近的茶室",
      date: "1942年11月4日",
      text: [
        "你没有靠近，只让茶杯挡住脸。Evelyn 对店员说，今晚又要加班，因为有几份来自港口的文件要重新归档。",
        "这不是情报本身，却是一条通往情报的走廊。",
        "低帽檐男人已经不在柜台旁。你突然意识到，他也许不是在看 Evelyn，而是在看你。"
      ],
      choices: [
        { label: "趁人多离开，避免留下更深印象。", next: "harris_glimpse", effects: { cover: 1 } },
        { label: "跟随 Evelyn 到街角，判断她今晚的路线。", next: "ministry_steps", effects: { intel: 2, suspicion: 2 } },
        { label: "放弃跟踪，去灰鸦指定的死信箱留简报。", next: "dead_drop", effects: { intel: 1, conscience: -1, suspicion: 1 } }
      ]
    },
    harris_glimpse: {
      title: "低帽檐男人",
      location: "查令十字路",
      date: "1942年11月4日",
      text: [
        "你从橱窗反光里看见那个人。他没有跟得太近，也没有犯任何外行人的错。",
        "在一个路口，他停下买报纸。你看见他袖口露出一截证件夹，又迅速被大衣遮住。",
        "如果他是安全部门的人，你的时间比灰鸦信上写得更少。"
      ],
      choices: [
        { label: "改走拥挤街区，稳住身份。", next: "ministry_steps", effects: { cover: 1, suspicion: -1 } },
        { label: "故意露出破绽，试探他是否上钩。", next: "harris_warning", effects: { intel: 1, suspicion: 2 } },
        { label: "今晚不行动，先回出租屋。", next: "night_radio", effects: { cover: 1, conscience: 1 } }
      ]
    },
    harris_warning: {
      title: "Harris 的影子",
      location: "河岸街",
      date: "1942年11月4日",
      text: [
        "你在报亭前停了太久。低帽檐男人没有靠近，只把报纸翻到讣告版。",
        "这不是抓捕，是警告。他知道你看见了他，也让你知道他知道。",
        "后来你会知道他的名字：Harris，安全部门里那种从不提高声音的人。"
      ],
      choices: [
        { label: "收起试探，回到 Evelyn 这条线索。", next: "ministry_steps", effects: { cover: -1, suspicion: 1 } },
        { label: "直接去死信箱，请求灰鸦安排撤离。", next: "dead_drop", effects: { intel: 1, suspicion: 1 } }
      ]
    },
    ministry_steps: {
      title: "石阶与打字声",
      location: "白厅，电报部门外",
      date: "1942年11月5日",
      text: [
        "电报部门外的石阶被雨水洗得发亮。人们进出时不看彼此，像每个人都背着一个不该被问起的秘密。",
        "Evelyn 认出了你。她说今晚值班会很晚，语气里有一种被战争磨薄的疲惫。",
        "你看到她文件袋边缘露出港口印章。那可能是你要找的门缝。"
      ],
      choices: [
        { label: "提出帮她送一段路，争取更多信任。", next: "walk_evelyn", effects: { cover: 1, conscience: 1 } },
        { label: "趁门厅混乱记下文件袋编号。", next: "archive_lead", effects: { intel: 2, suspicion: 1 } },
        { label: "告诉她别把所有疲惫都归给战争。", next: "walk_evelyn", effects: { conscience: 2, cover: -1 } }
      ]
    },
    walk_evelyn: {
      title: "一段路",
      location: "圣詹姆斯公园边",
      date: "1942年11月5日",
      text: [
        "你们沿着暗下来的公园边走。远处防空探照灯扫过云底，像巨大的白色伤口。",
        "Evelyn 说她哥哥的船队下周可能再出海。她不知道路线，只知道每次电报室加班，家属就会少睡几个晚上。",
        "你忽然明白，你要偷走的不是纸面上的路线，而是一批活人的归途。"
      ],
      choices: [
        { label: "压下动摇，继续询问她工作中的文件流向。", next: "archive_lead", effects: { intel: 2, conscience: -1 } },
        { label: "避开工作话题，只把她送到街口。", next: "night_radio", effects: { conscience: 2, cover: 1 } },
        { label: "暗示她最近要小心陌生人。", next: "evelyn_doubt", effects: { conscience: 2, suspicion: 1 } }
      ]
    },
    evelyn_doubt: {
      title: "不该说的话",
      location: "圣詹姆斯公园边",
      date: "1942年11月5日",
      text: [
        "Evelyn 停下脚步。她问：你为什么这么说？",
        "你的回答太慢。她没有逼问，只把围巾拉得更紧。信任在寒风里裂开一道细缝。",
        "可那句话已经说出口。某个更像人的部分，暂时赢过了任务。"
      ],
      choices: [
        { label: "用疲惫和空袭传闻圆过去。", next: "night_radio", effects: { cover: 1, conscience: 1 } },
        { label: "承认你知道有人盯上了她，但不说原因。", next: "harris_contact", effects: { conscience: 2, suspicion: 2 } }
      ]
    },
    archive_lead: {
      title: "编号",
      location: "白厅附近",
      date: "1942年11月5日",
      text: [
        "编号被你记在脑中：不是路线本身，而是能找到路线的抽屉。",
        "这一步让任务从雾里走出来。只要再取得一份转运摘要，灰鸦就能拼出足够危险的图案。",
        "危险的是，你也开始能拼出另一幅图案：如果情报外泄，Evelyn 的哥哥可能正好在那条线上。"
      ],
      choices: [
        { label: "继续追索转运摘要。", next: "night_radio", effects: { intel: 2, suspicion: 1 } },
        { label: "故意记错一个细节，给自己留退路。", next: "night_radio", effects: { conscience: 2, intel: -1 } },
        { label: "把编号交给灰鸦，证明自己仍服从。", next: "dead_drop", effects: { intel: 2, conscience: -1, suspicion: 1 } }
      ]
    },
    dead_drop: {
      title: "灰鸦的回音",
      location: "废弃电影院外",
      date: "1942年11月6日",
      text: [
        "灰鸦没有露面。他从不露面。你只在指定地点找到一张新的票根，上面用铅笔写着：不要犹豫，犹豫会害死你。",
        "这句话像命令，也像诅咒。你想到那些被命令推上火车、推上船、推向海雾的人。",
        "你离开时，电影院海报上的笑脸被雨水泡皱，像一张正在溶解的面具。"
      ],
      choices: [
        { label: "接受催促，准备最后一次接近文件。", next: "last_shift", effects: { intel: 1, conscience: -1 } },
        { label: "把票根留下，作为日后指认灰鸦的证据。", next: "last_shift", effects: { conscience: 2, suspicion: 1 } },
        { label: "先去找 Harris，赌英国人愿意听你开口。", next: "harris_contact", effects: { conscience: 3, suspicion: 1 }, requires: { stats: { conscience: { gte: 5 } } } }
      ]
    },
    night_radio: {
      title: "没有广播的夜",
      location: "索霍出租屋",
      date: "1942年11月6日",
      text: [
        "收音机被你拧到最小声。新闻里播报船只、吨位和天气，播报员的声音平稳得近乎残忍。",
        "楼下有人在唱很轻的歌，像是为了证明这个城市还没有把自己完全交给恐惧。",
        "你可以继续完成任务，也可以把自己从这条路上拖回来。两种选择都会有人付出代价。"
      ],
      choices: [
        { label: "整理已知线索，推进最后行动。", next: "last_shift", effects: { intel: 1, cover: 1 } },
        { label: "写下一份匿名警告，准备交给 Evelyn。", next: "evelyn_warning", effects: { conscience: 2, suspicion: 1 } },
        { label: "烧掉所有犹豫，向灰鸦递交中期成果。", next: "dead_drop", effects: { intel: 1, conscience: -2 } }
      ]
    },
    evelyn_warning: {
      title: "匿名纸条",
      location: "白厅附近邮筒",
      date: "1942年11月7日",
      text: [
        "你没有写名字，只写：护航相关文件已被盯上。不要独自处理编号为 C-17 的档案。",
        "这张纸条救不了所有人，却可能让某些门提前上锁。也可能把你暴露在 Harris 的桌面上。",
        "你把纸条投入邮筒，听见它落下去的声音，像一枚很小的审判。"
      ],
      choices: [
        { label: "趁混乱前完成最后刺探。", next: "last_shift", effects: { intel: 1, suspicion: 2, conscience: 1 } },
        { label: "主动等待 Harris 的反应。", next: "harris_contact", effects: { conscience: 2, suspicion: 1 } }
      ]
    },
    harris_contact: {
      title: "Harris 递来的火柴",
      location: "滑铁卢桥附近",
      date: "1942年11月7日",
      text: [
        "Harris 坐在长椅另一端，递来一盒火柴，像两个陌生人在谈论天气。",
        "他说：你可以继续跑，或者现在说出一个能让人活下来的理由。",
        "你没有看到手铐。那比手铐更可怕。他给你的不是自由，而是最后一次选择。"
      ],
      choices: [
        { label: "承认灰鸦存在，交出可核实的线索。", next: "defection_path", effects: { conscience: 2, intel: -1, suspicion: -1 } },
        { label: "否认一切，试图保住身份。", next: "last_shift", effects: { cover: -2, suspicion: 2 } },
        { label: "只给半真半假的说法，拖延双方。", next: "last_shift", effects: { intel: 1, suspicion: 1 } }
      ]
    },
    last_shift: {
      title: "最后一次值班",
      location: "白厅，电报部门外",
      date: "1942年11月8日",
      text: [
        "空袭警报没有响，但每个人都像在等待它。Evelyn 从门内走出，脸色苍白。她说有些文件被临时转移了。",
        "你知道这可能是你的机会，也可能是 Harris 布下的网。",
        "楼梯间尽头，一扇办公室门没有关严。里面有你需要的转运摘要，或者一个等你踏进去的陷阱。"
      ],
      choices: [
        { label: "冒险进入办公室，取得最后一块拼图。", next: "final_crossroads", effects: { intel: 3, suspicion: 3, cover: -1 } },
        { label: "让 Evelyn 离开危险区域，再考虑文件。", next: "final_crossroads", effects: { conscience: 3, intel: 1, cover: -1 } },
        { label: "认定这是陷阱，立刻撤离。", next: "final_crossroads", effects: { cover: 1, suspicion: -1 } }
      ]
    },
    defection_path: {
      title: "交出灰鸦",
      location: "滑铁卢桥附近",
      date: "1942年11月7日",
      text: [
        "你说出灰鸦这个名字时，Harris 的表情没有变化。真正让他抬眼的，是你能描述灰鸦如何施压、如何把恐惧包装成服从。",
        "你不指望宽恕。你只要求把错误的路线交给灰鸦，让那张杀人的网在海上落空。",
        "Harris 沉默很久，说：你不会作为英雄被记录。你说：那正好。"
      ],
      choices: [
        { label: "配合 Harris 递出假情报，承担后果。", next: "ending_defect", effects: { conscience: 2 } },
        { label: "临阵退缩，试图独自逃走。", next: "ending_arrest", effects: { suspicion: 3, cover: -3 } }
      ]
    },
    final_crossroads: {
      title: "灯下无影",
      location: "伦敦，停电后的街道",
      date: "1942年11月8日",
      text: [
        "文件、纸条、恐惧和名字都在你口袋里变得沉重。城市没有灯，你却觉得自己第一次被照得无处可藏。",
        "灰鸦要情报。Harris 要真相。Evelyn 只想让她哥哥和更多陌生人活着回来。",
        "你必须选择把这场黑暗送向哪里。"
      ],
      choices: [
        {
          label: "把完整情报交给灰鸦，完成任务。",
          next: "ending_success",
          effects: { conscience: -2 },
          requires: { stats: { intel: { gte: 7 }, cover: { gte: 3 }, suspicion: { lte: 8 }, conscience: { lte: 6 } } }
        },
        {
          label: "向 Harris 坦白，并交出能阻止行动的线索。",
          next: "ending_defect",
          effects: { conscience: 1 },
          requires: { stats: { conscience: { gte: 6 } } }
        },
        {
          label: "用半份情报换取撤离，谁也不完全相信。",
          next: "ending_arrest",
          effects: { suspicion: 2 },
          requires: { stats: { suspicion: { gte: 6 } } }
        },
        {
          label: "迟疑太久，街角传来 Harris 的脚步声。",
          next: "ending_arrest",
          effects: {}
        }
      ]
    },
    ending_success: {
      title: "结局：成功窃取情报",
      location: "伦敦港外",
      date: "1942年11月9日",
      ending: true,
      text: [
        "灰鸦拿到了足够的情报。你没有听见海上的爆炸声，只在几天后的报纸角落读到损失数字。",
        "你活了下来，身份也没有立刻破裂。可 Adrian Vale 这个名字从此像一间没有门的房间，把你困在里面。",
        "这不是胜利。只是任务成功，而人失败。"
      ],
      choices: []
    },
    ending_defect: {
      title: "结局：变节",
      location: "安全部门临时办公室",
      date: "1942年11月9日",
      ending: true,
      text: [
        "假情报被递出，灰鸦的网落在错误的海域。真正的船队在雾后改变航线，许多人不知道自己曾经离死亡很近。",
        "你被带进一间没有窗的办公室，开始说出所有能说出的事。没有掌声，没有赦免，只有一盏刺眼的灯和一叠空白纸。",
        "你终于背叛了那个把服从称为命运的机器。代价会很长，但这一次，代价不是由陌生人替你支付。"
      ],
      choices: []
    },
    ending_arrest: {
      title: "结局：被捕",
      location: "伦敦，清晨",
      date: "1942年11月9日",
      ending: true,
      text: [
        "Harris 没有提高声音。他只是说出你的假名、真名，以及你以为没人注意到的每一次停顿。",
        "手铐合上的声音很轻，轻得像电报键最后一次落下。你不知道灰鸦是否已经逃走，也不知道 Evelyn 是否安全。",
        "你只知道，黑灯之下并非没有目光。只是你太晚才承认自己一直站在光里。"
      ],
      choices: []
    }
  }
};
