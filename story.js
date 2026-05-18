(function () {
  "use strict";

  const images = {
    c1a: sceneImage("assets/images/chapter-01-blackout-london.png", "灯火管制下的伦敦街道", "第一章 / 窗帘后的城市"),
    c1b: sceneImage("assets/images/chapter-01-soho-room.png", "索霍出租屋里的信封与烟灰缸", "第一章 / 桌上的纸灰"),
    c2a: sceneImage("assets/images/chapter-02-tea-room.png", "白厅附近雾气蒙住玻璃的茶室", "第二章 / 茶杯边缘"),
    c2b: sceneImage("assets/images/chapter-02-ministry-corridor.png", "电报部门外的昏暗走廊", "第二章 / 门缝里的纸声"),
    c3a: sceneImage("assets/images/chapter-03-waterloo-bridge.png", "滑铁卢桥上相隔很远的两个人影", "第三章 / 桥上的火柴"),
    c3b: sceneImage("assets/images/chapter-03-abandoned-cinema.png", "雨中的废弃电影院入口", "第三章 / 灰鸦留下票根"),
    c4a: sceneImage("assets/images/chapter-04-telegraph-office.png", "地下电报室里堆叠的纸卷与台灯", "第四章 / 双面账本"),
    c4b: sceneImage("assets/images/chapter-04-railway-platform.png", "灯火管制下的铁路站台", "第四章 / 等候的人群"),
    c5a: sceneImage("assets/images/chapter-05-dockside-dawn.png", "清晨港口雾气中的船影", "第五章 / 护航之夜"),
    c5b: sceneImage("assets/images/chapter-05-interrogation-room.png", "只有一盏灯的审讯室", "第五章 / 灯下无影")
  };

  const neutralChoices = [
    "把话留在纸面之外。",
    "顺着对方的沉默继续坐着。",
    "换一个更普通的说法。",
    "让雨声替你拖延几秒。",
    "把目光放回杯沿。",
    "记住这个细节，暂时不碰它。",
    "沿着人群移动，不改变步速。",
    "把问题折起来，放进口袋。",
    "等对方先说下一句。",
    "让这件事看起来只是巧合。",
    "从另一条街绕回去。",
    "把答案压低到只有自己听见。"
  ];

  const chapters = [
    {
      name: "第一章：灯火管制下的身份",
      date: "1942年11月3日",
      location: "伦敦，索霍与河岸街",
      images: [images.c1a, images.c1b],
      figures: ["房东太太", "报亭少年", "陌生邮差"],
      settings: ["索霍出租屋", "被遮住灯光的街口", "河岸街报亭", "公共防空室"],
      core: [
        "你的证件、配给卡和租房契约都写着 Adrian Vale。名字很干净，干净得像刚擦过的刀背。",
        "灰鸦的信没有邮戳，只留下关于北大西洋护航路线的含混要求。它不像命令，更像有人把一只手放到你的后颈。",
        "窗外的伦敦没有灯。每一扇被黑布盖住的窗，都像一个拒绝作证的人。"
      ],
      clues: ["灰鸦使用没有邮戳的信封", "房东太太记得每个房客的脚步声", "报亭旁出现过低帽檐男人"],
      pressure: "身份还干净，干净到让你不敢多看。"
    },
    {
      name: "第二章：Evelyn 的电报室",
      date: "1942年11月4日",
      location: "白厅附近，茶室与电报部门",
      images: [images.c2a, images.c2b],
      figures: ["Evelyn Carter", "值班门卫", "茶室店员"],
      settings: ["雾气蒙住玻璃的茶室", "白厅石阶", "电报部门走廊", "归档室外"],
      core: [
        "Evelyn Carter 说话很轻，像所有坏消息都已经提前经过她的手。",
        "她哥哥在护航船队服役。这个事实没有写在任务里，却在你读到它时改变了任务的重量。",
        "电报部门的门每开一次，里面的纸声就像潮水。你听不见内容，只听见许多人的命运被折叠。"
      ],
      clues: ["Evelyn 的哥哥即将随船队出海", "C-17 档案被临时换柜", "门卫记住了来访者的口音"],
      pressure: "你开始分不清接近和靠近之间的差别。"
    },
    {
      name: "第三章：灰鸦的压力",
      date: "1942年11月6日",
      location: "滑铁卢桥与废弃电影院",
      images: [images.c3a, images.c3b],
      figures: ["Harris", "灰鸦的信使", "电影院看门人"],
      settings: ["滑铁卢桥", "废弃电影院", "雨中的车站出口", "河边长椅"],
      core: [
        "Harris 递来的火柴盒没有点燃什么，却照出了你迟疑的轮廓。",
        "灰鸦没有露面。他的每一条消息都像从墙后伸出的手，只负责推你向前。",
        "雨把电影院海报泡皱。海报上的笑脸像一张正在溶解的假身份。"
      ],
      clues: ["灰鸦用旧电影票根传递压力", "Harris 知道 Adrian Vale 的部分行程", "有人在河边长椅留下火柴盒"],
      pressure: "两边都在等你犯错，只是耐心不同。"
    },
    {
      name: "第四章：双面账本",
      date: "1942年11月7日",
      location: "地下电报室与灯火管制站台",
      images: [images.c4a, images.c4b],
      figures: ["夜班打字员", "铁路巡查员", "沉默的女职员"],
      settings: ["地下电报室", "档案柜之间", "灯火管制站台", "河岸临时办公室"],
      core: [
        "电报室里没有人高声说话。真正危险的词，都被打字机敲成了普通格式。",
        "你手里开始有两本账：一本给灰鸦，一本留给可能还活着的人。",
        "站台上没有灯，只有人群里偶尔抬起的脸。每一张脸都可能属于情报，也可能属于损失名单。"
      ],
      clues: ["转运摘要缺少一页", "站台巡查员看过一封蓝边信", "Harris 的人开始查验临时通行证"],
      pressure: "谎言不再只是保护你，也开始保护或伤害别人。"
    },
    {
      name: "第五章：护航之夜",
      date: "1942年11月8日",
      location: "伦敦港外与临时办公室",
      images: [images.c5a, images.c5b],
      figures: ["Evelyn Carter", "Harris", "灰鸦"],
      settings: ["清晨港口", "临时审讯室", "电报线路旁", "雾中的街角"],
      core: [
        "港口的雾把船影藏得很浅，像命运只用一层薄纸盖住自己。",
        "完整路线、错误路线、沉默路线都在你手边。它们看起来只是纸，实际上每一张都向海上延伸。",
        "灯亮起来的时候，你发现自己已经没有地方能继续躲在名字后面。"
      ],
      clues: ["最终护航窗口被提前半日", "灰鸦不再相信延迟", "Harris 准备在黎明前收口"],
      pressure: "所有选择都开始索要名字。"
    }
  ];

  const nodes = {};

  chapters.forEach((chapter, chapterIndex) => {
    for (let step = 1; step <= 8; step += 1) {
      ["a", "b", "c"].forEach((variant, variantIndex) => {
        const id = nodeId(chapterIndex + 1, step, variant);
        const nextStep = step + 1;
        nodes[id] = {
          chapter: chapterIndex + 1,
          title: makeTitle(chapterIndex, step, variantIndex),
          location: chapter.settings[(step + variantIndex) % chapter.settings.length],
          date: chapter.date,
          mood: ["雨声", "纸声", "灯下", "雾中"][step % 4],
          image: imageFor(chapter, step),
          text: makeText(chapter, chapterIndex, step, variantIndex),
          clues: step === 2 || step === 6 ? [chapter.clues[(step + variantIndex) % chapter.clues.length]] : [],
          flags: step === 4 && variant === "b" ? [`c${chapterIndex + 1}_quiet_lie`] : [],
          delayedEffects: makeDelayed(chapterIndex + 1, step, variant),
          choices: makeChoices(chapterIndex + 1, step, variantIndex, nextStep)
        };
      });
    }
  });

  addEndings(nodes);

  window.GAME_STORY = {
    startNode: "c1_s1_a",
    chapters: chapters.map((chapter) => chapter.name),
    initialStats: {
      cover: 7,
      intel: 1,
      conscience: 2,
      suspicion: 1
    },
    initialRelations: {
      evelyn: 1,
      harris: 0,
      raven: 2
    },
    nodes
  };

  function sceneImage(src, alt, caption) {
    return { src, alt, caption };
  }

  function nodeId(chapter, step, variant) {
    return `c${chapter}_s${step}_${variant}`;
  }

  function imageFor(chapter, step) {
    if (step === 1) return chapter.images[0];
    if (step === 5) return chapter.images[1];
    return null;
  }

  function makeTitle(chapterIndex, step, variantIndex) {
    const titlePools = [
      ["没有邮戳的信", "窗帘后的名字", "报亭旁的停顿", "防空室里的咳声", "纸灰", "雨中的回身", "租约上的墨迹", "第一道门"],
      ["茶杯边缘", "雾气玻璃", "白厅石阶", "门卫的眼神", "归档室外", "Evelyn 的停顿", "电报纸声", "第二道门"],
      ["桥上的火柴", "旧电影票根", "河风", "Harris 的报纸", "灰鸦的回音", "车站出口", "长椅另一端", "第三道门"],
      ["双面账本", "缺失的一页", "地下台灯", "蓝边信", "站台人群", "临时通行证", "打字机", "第四道门"],
      ["护航之夜", "港口雾线", "错误路线", "黎明前", "灯下无影", "收口", "最后的纸", "第五道门"]
    ];
    return titlePools[chapterIndex][step - 1] + ["", "：旁证", "：回声"][variantIndex];
  }

  function makeText(chapter, chapterIndex, step, variantIndex) {
    const figure = chapter.figures[(step + variantIndex) % chapter.figures.length];
    const setting = chapter.settings[(step + variantIndex) % chapter.settings.length];
    const core = chapter.core[(step + variantIndex) % chapter.core.length];
    const suspicionLine = [
      "有人在你身后停了一秒，又像什么也没有发生一样继续走。",
      "你听见自己的假名从另一个人的嘴里出来，忽然觉得它比真名更危险。",
      "纸面上的字没有声音，却把房间压得更低。",
      "你知道这句话可以有两种解释，而两种解释都不会让你安全。"
    ][(step + variantIndex) % 4];
    const chapterLine = [
      "这里没有英雄的位置，只有人把责任推给更远的地方。",
      "你把表情收好，像把一封信重新塞回信封。",
      "战争把每个人都变成某种文件，区别只是谁有权归档。",
      "你没有立刻回答。沉默有时候比谎言更像证词。"
    ][(chapterIndex + step + variantIndex) % 4];
    return [
      core,
      `在${setting}，${figure}没有直接问你要什么，只把话题放在桌边，等你自己伸手。`,
      suspicionLine,
      chapterLine
    ];
  }

  function makeChoices(chapter, step, variantIndex, nextStep) {
    if (chapter === 5 && step === 8) {
      return [
        { label: "把完整的一份留在原处。", next: "resolve_ending", effects: { intel: 2, cover: -1 }, relations: { raven: 1 } },
        { label: "把另一份交给灯下的人。", next: "resolve_ending", effects: { conscience: 2, suspicion: -1 }, relations: { harris: 2, evelyn: 1 } },
        { label: "什么也不解释，等门自己打开。", next: "resolve_ending", effects: { suspicion: 2, cover: -2 } }
      ];
    }

    if (step === 8) {
      const nextChapter = chapter + 1;
      return [
        { label: neutralChoices[(chapter + step + variantIndex) % neutralChoices.length], next: nodeId(nextChapter, 1, "a"), effects: { cover: 1, intel: 1 }, clues: [`第${chapter}章留下的时间差`] },
        { label: neutralChoices[(chapter + step + variantIndex + 3) % neutralChoices.length], next: nodeId(nextChapter, 1, "b"), effects: { conscience: 1, suspicion: 1 }, relations: { evelyn: 1 } },
        { label: neutralChoices[(chapter + step + variantIndex + 6) % neutralChoices.length], next: nodeId(nextChapter, 1, "c"), effects: { intel: 1, suspicion: 1 }, relations: { raven: 1 } }
      ];
    }

    return [
      {
        label: neutralChoices[(chapter * 3 + step + variantIndex) % neutralChoices.length],
        next: nodeId(chapter, nextStep, "a"),
        effects: { cover: 1, intel: step % 3 === 0 ? 1 : 0, suspicion: step % 4 === 0 ? 1 : 0 },
        relations: relationShift(chapter, "careful"),
        clues: clueFor(chapter, step, "careful")
      },
      {
        label: neutralChoices[(chapter * 3 + step + variantIndex + 4) % neutralChoices.length],
        next: nodeId(chapter, nextStep, "b"),
        effects: { intel: 1, conscience: step % 2 === 0 ? 1 : 0, suspicion: step % 4 === 0 ? 1 : 0 },
        relations: relationShift(chapter, "human"),
        clues: clueFor(chapter, step, "human"),
        delayedEffects: step % 2 === 0 ? [{ chapter: Math.min(5, chapter + 1), effects: { suspicion: 1 }, clues: ["早先的停顿被重新提起"] }] : []
      },
      {
        label: neutralChoices[(chapter * 3 + step + variantIndex + 8) % neutralChoices.length],
        next: nodeId(chapter, nextStep, "c"),
        effects: { intel: 2, cover: -1, conscience: chapter >= 3 ? 1 : 0 },
        relations: relationShift(chapter, "raven"),
        clues: clueFor(chapter, step, "raven"),
        delayedEffects: step % 3 === 0 ? [{ at: nodeId(chapter, Math.min(8, step + 2), "c"), effects: { cover: -1, suspicion: 1 }, flags: [`c${chapter}_old_shadow`] }] : []
      }
    ];
  }

  function relationShift(chapter, type) {
    if (type === "human") return { evelyn: chapter <= 4 ? 1 : 0, harris: chapter >= 3 ? 1 : 0 };
    if (type === "raven") return { raven: 1, harris: chapter >= 3 ? 1 : 0 };
    return { harris: chapter >= 3 ? 1 : 0 };
  }

  function clueFor(chapter, step, type) {
    if (step % 2 !== 0) return [];
    const names = {
      careful: "一处被擦掉的日期",
      human: "某个人没有说完的句子",
      raven: "灰鸦措辞里的催促"
    };
    return [`第${chapter}章线索：${names[type]}`];
  }

  function makeDelayed(chapter, step, variant) {
    if (step !== 3 || variant !== "a") return [];
    return [{ chapter: Math.min(5, chapter + 1), effects: { suspicion: 1 }, relations: { harris: 1 }, clues: ["早先的路线被人复核"] }];
  }

  function addEndings(target) {
    target.ending_success_cold = ending(
      "结局：成功窃取情报",
      "伦敦港外",
      "1942年11月9日",
      [
        "完整路线离开伦敦时，城市仍然没有灯。你没有听见海上的声音，只在几天后的报纸角落读到数字。",
        "Adrian Vale 活了下来。这个名字从此像一间没有门的房间，把你和那些数字关在一起。",
        "任务完成了。可完成任务的人，在完成的那一刻已经失去退路。"
      ]
    );
    target.ending_success_hollow = ending(
      "结局：成功窃取情报，余烬",
      "索霍出租屋",
      "1942年11月9日",
      [
        "灰鸦拿到了足够的路线，却也看见你在其中留下的迟疑。结果仍旧危险，只是不再像命令里写得那样整齐。",
        "你保住了身份，却保不住睡眠。每一次电报声响起，你都想起 Evelyn 没说完的话。",
        "成功没有让你更接近胜利，只让失败换了一种更安静的形状。"
      ]
    );
    target.ending_defect_costly = ending(
      "结局：变节，高代价",
      "临时办公室",
      "1942年11月9日",
      [
        "你把能证明灰鸦存在的碎片交给 Harris，也把自己交到一盏不会熄灭的灯下。",
        "假路线被送出，真正的船队在雾后改道。许多人不会知道自己曾经离死亡很近。",
        "没有掌声，也没有干净的赦免。你只是终于让代价落回自己身上。"
      ]
    );
    target.ending_defect_lonely = ending(
      "结局：变节，孤证",
      "滑铁卢桥",
      "1942年11月9日",
      [
        "你说出一半真相，另一半被恐惧咬住。Harris 没有承诺，只把你的每个词都写进纸里。",
        "灰鸦的网没有完全张开，Evelyn 的哥哥或许仍在海雾之后。你无法确认，也没有资格要求确认。",
        "这不是洗清。只是你第一次没有把沉默交给更坏的人。"
      ]
    );
    target.ending_arrest_silent = ending(
      "结局：被捕",
      "灯下的房间",
      "1942年11月9日",
      [
        "Harris 说出你的假名、真名，以及你以为没人注意到的每一次停顿。",
        "手铐合上的声音很轻，轻得像电报键最后一次落下。",
        "你终于明白，黑灯之下并非没有目光。只是你太晚才承认自己一直站在光里。"
      ]
    );
    target.ending_arrest_failed = ending(
      "结局：被捕，未寄出的信",
      "清晨的街角",
      "1942年11月9日",
      [
        "你没有把情报交出去，也没能把真相交给该听见的人。两边都只看见一个迟疑的影子。",
        "Harris 的人从雾里走出时，你口袋里还有一封没写完的信。",
        "有些失败没有爆炸声。它们只是在黎明前，把所有可能性一并收走。"
      ]
    );
  }

  function ending(title, location, date, text) {
    return { chapter: 5, title, location, date, ending: true, text, choices: [] };
  }
})();
