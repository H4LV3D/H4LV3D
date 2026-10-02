import type { NoteTranslations } from "./types";

export const zh: NoteTranslations = {
  "one-sign-in-many-apps": {
    title: "多个应用，一次登录",
    summary: "The Circular Net 的产品如何迁移到统一的 OAuth 2.0 登录服务，以及保证它安全的那些规则。",
    blocks: [
      {
        type: "p",
        text: "在 The Circular Net，每个产品过去都有自己的登录。只有一个应用时还行；当有了 Web 应用、移动应用、活动产品和官网，每个认证 bug 都得修四遍，用户也要为同一家公司记好几个密码。",
      },
      { type: "h", text: "整体结构" },
      {
        type: "p",
        text: "登录被拆成独立应用，部署在自己的域名上。各产品不再显示登录表单，而是带着自己的 client ID 和重定向地址把用户送到 SSO 服务；服务完成登录后，带着一个短时有效的授权码把用户送回，产品再用它换取令牌。",
      },
      { type: "diagram", id: "sso", caption: "所有产品都通过同一个服务登录。" },
      { type: "h", text: "真正重要的规则" },
      {
        type: "list",
        items: [
          "每次都对照注册表校验客户端和重定向地址。能随意跳转的登录页，就是印着你 logo 的钓鱼工具。",
          "发出一个 state 值，并在用户返回时校验。这样伪造的回调就无法让任何人登录。",
          "把社交登录放在 SSO 后面。各产品从不直接对接 Google 或 Apple，新增一个提供方只需改一处。",
          "让交接过程可见。某个环节变慢时，一个简短的“正在带你返回”页面胜过一片空白的跳转。",
        ],
      },
      { type: "h", text: "取舍" },
      {
        type: "p",
        text: "独立服务意味着多一样需要部署和监控的东西，而且所有产品都依赖它。换来的是：认证修复只做一次，安全审查只有一个目标，新产品只需注册一个客户端就能获得登录，而不必自己写表单。",
      },
      { type: "p", text: "如果重来一次，我会在第二个产品时就引入 SSO，而不是等到第四个。" },
    ],
  },
  "share-logic-not-screens": {
    title: "共享逻辑，不共享界面",
    summary: "Circular Ticket 的 Next.js 与 Expo 应用之间，哪些放进了共享包，哪些没有，以及为什么。",
    blocks: [
      {
        type: "p",
        text: "Circular Ticket 最初是一个 Web 应用。移动应用到来时，最快的做法是把 API 调用和规则复制过去。没过几周，两个应用就在一些不起眼却很重要的地方出现分歧：奈拉金额怎么格式化，哪些订单状态算已支付，主办方什么时候可以申请提现。",
      },
      { type: "h", text: "一个包，三条规则" },
      {
        type: "p",
        text: "两个应用都迁入了基于 npm workspaces 的 monorepo，只有一个共享包。它遵循三条规则：",
      },
      {
        type: "list",
        items: [
          "共享必须一致的东西：API 服务、查询 hooks、校验 schema、货币格式化、状态映射，以及提现资格这类业务规则。",
          "不共享界面。每个应用的界面都保持各自平台的原生体验，谁都不像对方的移植版。",
          "共享代码中不允许出现平台相关的导入。如果某个模块需要 DOM 或原生 API，它就不属于这个包。",
        ],
      },
      { type: "diagram", id: "circularTicket", caption: "两个应用，一个共享包。" },
      { type: "h", text: "难点在依赖" },
      {
        type: "p",
        text: "代码搬得很顺利，版本却不然。React、TanStack Query 和校验库在两个应用中必须解析到相同版本，而 Next.js 和 Metro 对依赖提升（hoisting）的处理并不一样。版本统一在一处对齐，lockfile 的变更在代码评审中检查。",
      },
      { type: "h", text: "值得吗？" },
      {
        type: "p",
        text: "值得。现在修改“何时可以申请提现”只需要改一个文件，两个应用同时生效。Web 和移动端再也不会在钱的问题上出现分歧，单凭这一点，这次迁移就物有所值。",
      },
    ],
  },
  "filter-before-you-think": {
    title: "先过滤，再思考",
    summary: "Stock Bot 的设计：一个定时运行、以极低成本解读尼日利亚股市的 LLM 智能体。",
    blocks: [
      {
        type: "p",
        text: "Stock Bot 是我正在做的一个小型智能体。它每天找出尼日利亚证券交易所里下跌的股票，判断哪些下跌像是机会，再把候选名单发到我的 Telegram。最有意思的不是 LLM，而是它周围的一切。",
      },
      { type: "h", text: "流水线" },
      { type: "diagram", id: "stockBot", caption: "每日一次运行：从定时到报告。" },
      {
        type: "list",
        items: [
          "EventBridge 定时任务每天触发一次 Lambda 函数。",
          "函数只抓取当天跌幅最大的股票，而不是全部上市公司。",
          "对每只股票，查看 DynamoDB 中保存的五天价格，确认是真实的回调，而不是某一天的噪声。",
          "只有通过筛选的股票才会带着结构化提示词交给 Gemini，精选结果发到 Telegram。",
        ],
      },
      { type: "h", text: "为什么先过滤" },
      {
        type: "p",
        text: "LLM 调用是最慢、最贵的一步，所以放在最后。普通代码零成本地筛掉大部分候选，模型只评判少数值得评判的股票。这个思路适用于任何智能体：让便宜、确定性的步骤先缩小问题，把“智能”花在能改变答案的地方。",
      },
      { type: "h", text: "包越小，意外越少" },
      {
        type: "p",
        text: "第一版用了 pandas，导致 Lambda 包太大，不加额外的层就无法部署。换成轻量的 HTML 解析器后问题就消失了。Serverless 偏爱朴素的依赖。",
      },
      {
        type: "p",
        text: "项目仍在进行中：流水线在本地已跑通，部署正在收尾。下一步，我想记录每一次选择，并把模型的判断与市场的真实走势做对比。",
      },
    ],
  },
};
