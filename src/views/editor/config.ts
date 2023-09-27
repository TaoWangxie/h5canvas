export const gridTags = [
    {
        id: '0',
        label: '矩形',
        comKey: 'RectangleNew',
        isSlot: true,
        src: 'https://phpimg.ziroom.com/ee9e1d18-6037-4ea5-be56-ef76f4c08854.png',
        style: {
            width: "auto",
            height: 40,
            top: 0,
            left: 0
        },
        config: {
            data: {
                display: 'block',
                position: 'relative',
                flex: 'none',
                flexWrap: 'nowrap',
                background: '',
                backgroundColor: '',
                opacity: 1,
                borderWidth: 0,
                borderStyle: 'solid',
                // borderRadius: 0,
                                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                borderBottomLeftRadius: 0,
                borderColor: '#000000',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
                backgroundPositionX: 'left',
                backgroundPositionY: 'top',
                paddingTop: 0,
                paddingRight: 0,
                paddingBottom: 0,
                paddingLeft: 0,
                marginTop: 0,
                marginRight: 0,
                marginBottom: 0,
                marginLeft: 0,
            },
            fieldList: [
                { isCms: false, label: "元素布局", newProp:'', prop: "display", type: "select", list: 'displayList' },
                { isCms: false, label: "定位", newProp:'', prop: "position", type: "radio", list: 'positionList' },
                { isCms: false,label: "flex属性", newProp:'', prop: "flex", type: "input" },
                { isCms: false,label: "flex换行", newProp:'', prop: "flexWrap", type: "select", list: 'flexWrapList' },
                {
                    isCms: false,label: "边框", newProp:'', prop: "border", type: 'array', children: [
                        { isCms: true,label: "边框宽度", newProp:'', prop: "borderWidth", type: "inputNumber", controlsPosition: "right", min: 0 },
                        { isCms: true,label: "边框样式", newProp:'', prop: "borderStyle", type: "select", width: '80px', list: 'borderStyleList' },
                        // { isCms: true,label: "边框圆角", newProp:'', prop: "borderRadius", type: "inputNumber", controlsPosition: "right", min: 0 },
                        { isCms: true,label: "边框颜色", newProp:'', prop: "borderColor", type: "color", width: '30px' },
                    ]
                },
                {
                    isCms: false,label: "圆角", newProp:'', prop: "borderRadius", type: 'array', children: [
                        { isCms: true,label: "圆角左上", newProp:'', prop: "borderTopLeftRadius", type: "inputNumber", controlsPosition: "right", min: 0 },
                        { isCms: true,label: "圆角右上", newProp:'', prop: "borderTopRightRadius", type: "inputNumber", controlsPosition: "right", min: 0 },
                        { isCms: true,label: "圆角右下", newProp:'', prop: "borderBottomRightRadius", type: "inputNumber", controlsPosition: "right", min: 0 },
                        { isCms: true,label: "圆角左下", newProp:'', prop: "borderBottomLeftRadius", type: "inputNumber", controlsPosition: "right", min: 0  },
                    ]
                },
                {
                    isCms: false,label: "内边距", newProp:'', prop: "padding", type: 'array', children: [
                        { isCms: true, label: "内上边距", newProp:'', prop: "paddingTop", type: "inputNumber", controlsPosition: "right", min: 0 },
                        { isCms: true, label: "内右边距", newProp:'', prop: "paddingRight", type: "inputNumber", controlsPosition: "right", min: 0 },
                        { isCms: true, label: "内下边距", newProp:'', prop: "paddingBottom", type: "inputNumber", controlsPosition: "right", min: 0 },
                        { isCms: true, label: "内左边距", newProp:'', prop: "paddingLeft", type: "inputNumber", controlsPosition: "right", min: 0 },
                    ]
                },
                {
                    isCms: false,label: "外边距", newProp:'', prop: "margin", type: 'array', children: [
                        { isCms: true,label: "外上边距", newProp:'', prop: "marginTop", type: "inputNumber", controlsPosition: "right", min: 0 },
                        { isCms: true,label: "外右边距", newProp:'', prop: "marginRight", type: "inputNumber", controlsPosition: "right", min: 0 },
                        { isCms: true,label: "外下边距", newProp:'', prop: "marginBottom", type: "inputNumber", controlsPosition: "right", min: 0 },
                        { isCms: true,label: "外左边距", newProp:'', prop: "marginLeft", type: "inputNumber", controlsPosition: "right", min: 0 },
                    ]
                },
                { isCms: false,label: "不透明度", newProp:'', prop: "opacity", type: "inputNumber", min: 0.1, step: 0.1 },
                { isCms: false,label: "背景色", newProp:'', prop: "backgroundColor", type: "color" },
                { isCms: false,label: "背景地址", newProp:'', prop: "background", type: "img" },
                { isCms: false,label: "背景重复", newProp:'', prop: "backgroundRepeat", type: "select", list: 'backgroundRepeatList' },
                { isCms: false,label: "背景尺寸", newProp:'', prop: "backgroundSize", type: "select", allowCreate: true, defaultFirstOption: true, list: 'backgroundSizeList' },
                {
                    isCms: false,label: "背景位置", newProp:'', prop: "backgroundPosition", type: 'array', children: [
                        { isCms: true,label: "水平背景位置", newProp:'', prop: "backgroundPositionX", type: "select", allowCreate: true, defaultFirstOption: true, list: 'backgroundPositionXList' },
                        { isCms: true,label: "垂直背景位置", newProp:'', prop: "backgroundPositionY", type: "select", allowCreate: true, defaultFirstOption: true, list: 'backgroundPositionYList' },
                    ]
                },
            ],
            listTypeInfo: {
                displayList:[
                    {
                        id: 'block',
                        name: 'block'
                    },
                    {
                        id: 'inline-block',
                        name: 'inline-block'
                    },
                    {
                        id: 'flex',
                        name: 'flex'
                    },
                    {
                        id: 'inline-flex',
                        name: 'inline-flex'
                    },
                ],
                positionList:[
                    {
                        label: 'relative',
                        value: 'relative'
                    },
                    {
                        label: 'absolute',
                        value: 'absolute'
                    },
                ],
                flexWrapList:[
                    {
                        id: 'nowrap',
                        name: '不换行'
                    },
                    {
                        id: 'wrap',
                        name: '换行'
                    },
                    {
                        id: 'wrap-reverse',
                        name: '反向换行'
                    },
                ],
                borderStyleList: [
                    {
                        id: 'solid',
                        name: '实线'
                    },
                    {
                        id: 'dashed',
                        name: '虚线'
                    },
                    {
                        id: 'dotted',
                        name: '圆点'
                    },
                ],
                backgroundRepeatList: [
                    {
                        id: 'no-repeat',
                        name: '不重复'
                    },
                    {
                        id: 'repeat',
                        name: '重复'
                    },
                ],
                backgroundSizeList: [
                    {
                        id: '100% 100%',
                        name: '100% 100%'
                    },
                    {
                        id: 'contain',
                        name: 'contain'
                    },
                    {
                        id: 'cover',
                        name: 'cover'
                    },
                    {
                        id: 'auto',
                        name: 'auto'
                    },
                ],
                backgroundPositionXList: [
                    {
                        id: 'left',
                        name: '居左'
                    },
                    {
                        id: 'right',
                        name: '居右'
                    },
                    {
                        id: 'center',
                        name: '居中'
                    },
                ],
                backgroundPositionYList: [
                    {
                        id: 'top',
                        name: '置顶'
                    },
                    {
                        id: 'bottom',
                        name: '置底'
                    },
                    {
                        id: 'center',
                        name: '居中'
                    },
                ],
            }
        },
    },
    {
        id: '1',
        label: '文本',
        comKey: 'TextNew',
        isSlot: false,
        src: 'https://phpimg.ziroom.com/aaa029ab-a520-4a96-b2b2-39a9e5343469.png',
        style: {
            width: 'auto',
            height: 40
        },
        config: {
            data: {
                text: '我是文本呀',
                display: 'block',
                position: 'relative',
                fontSize: 16,
                fontWeight: 'normal',
                color: '#303133',
                backgroundColor: '',
                lineHeight: 'normal',
                letterSpacing: 1,
                opacity: 1,
                borderWidth: 0,
                borderStyle: 'solid',
                // borderRadius: 0,
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                borderBottomLeftRadius: 0,
                justifyContent: 'flex-start',
                textAlign: 'left',
                alignItems: 'flex-start',
                borderColor: '#000000',
                background: '',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
                backgroundPositionX: 'left',
                backgroundPositionY: 'top',
                paddingTop: 0,
                paddingRight: 0,
                paddingBottom: 0,
                paddingLeft: 0,
                marginTop: 0,
                marginRight: 0,
                marginBottom: 0,
                marginLeft: 0,
            },
            fieldList: [
                { isCms: false,label: "文本", newProp:'', prop: "text", type: "input" },
                { isCms: false,label: "元素布局", newProp:'', prop: "display", type: "select", list: 'displayList' },
                { isCms: false, label: "定位", newProp:'', prop: "position", type: "radio", list: 'positionList' },
                {
                    isCms: false, label: "字号", newProp:'', prop: "font", type: 'array', children: [
                        { isCms: true, label: "字号", newProp:'', prop: "fontSize", type: "inputNumber", controlsPosition: "right", min: 12 },
                        { isCms: true, label: "加粗", newProp:'', prop: "fontWeight", type: "select", list: 'fontWeightList' },
                    ]
                },
                { isCms: false,label: "字体颜色", newProp:'', prop: "color", type: "color" },
                { isCms: false,label: "背景色", newProp:'', prop: "backgroundColor", type: "color" },
                {
                    isCms: false,label: "内边距", newProp:'', prop: "padding", type: 'array', children: [
                        { isCms: true, label: "内上边距", newProp:'', prop: "paddingTop", type: "inputNumber", controlsPosition: "right", min: 0 },
                        { isCms: true, label: "内右边距", newProp:'', prop: "paddingRight", type: "inputNumber", controlsPosition: "right", min: 0 },
                        { isCms: true, label: "内下边距", newProp:'', prop: "paddingBottom", type: "inputNumber", controlsPosition: "right", min: 0 },
                        { isCms: true, label: "内左边距", newProp:'', prop: "paddingLeft", type: "inputNumber", controlsPosition: "right", min: 0 },
                    ]
                },
                {
                    isCms: false,label: "外边距", newProp:'', prop: "margin", type: 'array', children: [
                        { isCms: true,label: "外上边距", newProp:'', prop: "marginTop", type: "inputNumber", controlsPosition: "right", min: 0 },
                        { isCms: true,label: "外右边距", newProp:'', prop: "marginRight", type: "inputNumber", controlsPosition: "right", min: 0 },
                        { isCms: true,label: "外下边距", newProp:'', prop: "marginBottom", type: "inputNumber", controlsPosition: "right", min: 0 },
                        { isCms: true,label: "外左边距", newProp:'', prop: "marginLeft", type: "inputNumber", controlsPosition: "right", min: 0 },
                    ]
                },
                { isCms: false, label: "行高", newProp:'', prop: "lineHeight", type: "inputNumber", min: 0, step: 1 },
                { isCms: false, label: "字间距", newProp:'', prop: "letterSpacing", type: "inputNumber", min: 0.1, step: 0.1 },
                { isCms: false, label: "不透明度", newProp:'', prop: "opacity", type: "inputNumber", min: 0.1, step: 0.1 },
                { isCms: false, label: "文字对齐", newProp:'', prop: "textAlign", type: "radio", list: 'textAlignList' },
                { isCms: false, label: "水平对齐", newProp:'', prop: "justifyContent", type: "radio", list: 'justifyContentList' },
                { isCms: false, label: "垂直对齐", newProp:'', prop: "alignItems", type: "radio", list: 'alignItemsList' },
                {
                    isCms: false,label: "边框", newProp:'', prop: "border", type: 'array', children: [
                        { isCms: true,label: "边框宽度", newProp:'', prop: "borderWidth", type: "inputNumber", controlsPosition: "right", min: 0 },
                        { isCms: true,label: "边框样式", newProp:'', prop: "borderStyle", type: "select", width: '100px', list: 'borderStyleList' },
                        // { isCms: true,label: "边框圆角", newProp:'', prop: "borderRadius", type: "inputNumber", controlsPosition: "right", min: 0 },
                        { isCms: true,label: "边框颜色", newProp:'', prop: "borderColor", type: "color", width: '40px' },
                    ]
                },
                {
                    isCms: false,label: "圆角", newProp:'', prop: "borderRadius", type: 'array', children: [
                        { isCms: true,label: "圆角左上", newProp:'', prop: "borderTopLeftRadius", type: "inputNumber", controlsPosition: "right", min: 0 },
                        { isCms: true,label: "圆角右上", newProp:'', prop: "borderTopRightRadius", type: "inputNumber", controlsPosition: "right", min: 0 },
                        { isCms: true,label: "圆角右下", newProp:'', prop: "borderBottomRightRadius", type: "inputNumber", controlsPosition: "right", min: 0 },
                        { isCms: true,label: "圆角左下", newProp:'', prop: "borderBottomLeftRadius", type: "inputNumber", controlsPosition: "right", min: 0  },
                    ]
                },
                { isCms: false,label: "背景地址", newProp:'', prop: "background", type: "img" },
                { isCms: false,label: "背景重复", newProp:'', prop: "backgroundRepeat", type: "select", list: 'backgroundRepeatList' },
                { isCms: false,label: "背景尺寸", newProp:'', prop: "backgroundSize", type: "select", allowCreate: true, defaultFirstOption: true, list: 'backgroundSizeList' },
                {
                    isCms: false,label: "背景位置", newProp:'', prop: "backgroundPosition", type: 'array', children: [
                        { isCms: true,label: "水平背景位置", newProp:'', prop: "backgroundPositionX", type: "select", allowCreate: true, defaultFirstOption: true, list: 'backgroundPositionXList' },
                        { isCms: true,label: "垂直背景位置", newProp:'', prop: "backgroundPositionY", type: "select", allowCreate: true, defaultFirstOption: true, list: 'backgroundPositionYList' },
                    ]
                },
            ],
            listTypeInfo: {
                displayList:[
                    {
                        id: 'block',
                        name: 'block'
                    },
                    {
                        id: 'inline-block',
                        name: 'inline-block'
                    },
                    {
                        id: 'flex',
                        name: 'flex'
                    },
                    {
                        id: 'inline-flex',
                        name: 'inline-flex'
                    },
                ],
                positionList:[
                    {
                        label: 'relative',
                        value: 'relative'
                    },
                    {
                        label: 'absolute',
                        value: 'absolute'
                    },
                ],
                fontWeightList: [
                    {
                        id: 'normal',
                        name: '正常'
                    },
                    {
                        id: 'bold',
                        name: '加粗'
                    },
                    {
                        id: '400',
                        name: '400'
                    },
                    {
                        id: '500',
                        name: '500'
                    },
                    {
                        id: '600',
                        name: '600'
                    },
                    {
                        id: '700',
                        name: '700'
                    },
                ],
                borderStyleList: [
                    {
                        id: 'solid',
                        name: '实线'
                    },
                    {
                        id: 'dashed',
                        name: '虚线'
                    },
                    {
                        id: 'dotted',
                        name: '圆点'
                    },
                ],
                textAlignList: [
                    {
                        label: '左对齐',
                        value: 'left'
                    },
                    {
                        label: '居中',
                        value: 'center'
                    },
                    {
                        label: '右对齐',
                        value: 'right'
                    },
                ],
                justifyContentList: [
                    {
                        label: '左对齐',
                        value: 'flex-start'
                    },
                    {
                        label: '居中',
                        value: 'center'
                    },
                    {
                        label: '右对齐',
                        value: 'flex-end'
                    },
                ],
                alignItemsList: [
                    {
                        label: '上对齐',
                        value: 'flex-start'
                    },
                    {
                        label: '居中',
                        value: 'center'
                    },
                    {
                        label: '下对齐',
                        value: 'flex-end'
                    },
                ],
                backgroundRepeatList: [
                    {
                        id: 'no-repeat',
                        name: '不重复'
                    },
                    {
                        id: 'repeat',
                        name: '重复'
                    },
                ],
                backgroundSizeList: [
                    {
                        id: '100% 100%',
                        name: '100% 100%'
                    },
                    {
                        id: 'contain',
                        name: 'contain'
                    },
                    {
                        id: 'cover',
                        name: 'cover'
                    },
                    {
                        id: 'auto',
                        name: 'auto'
                    },
                ],
                backgroundPositionXList: [
                    {
                        id: 'left',
                        name: '居左'
                    },
                    {
                        id: 'right',
                        name: '居右'
                    },
                    {
                        id: 'center',
                        name: '居中'
                    },
                ],
                backgroundPositionYList: [
                    {
                        id: 'top',
                        name: '置顶'
                    },
                    {
                        id: 'bottom',
                        name: '置底'
                    },
                    {
                        id: 'center',
                        name: '居中'
                    },
                ],
            }
        },
    },
    {
        id: '2',
        label: '视频盒子',
        comKey: 'VideoBoxNew',
        isSlot: false,
        src: 'https://phpimg.ziroom.com/42bd4c36-1b7c-4c36-ba55-a1ea9d27ebff.png',
        style: {
            width: "auto",
            height: 450
        },
        config: {
            data: {
                src: 'https://lf3-cdn-tos.bytescm.com/obj/eden-cn/lmeh7pfuho/campus/campus_intro_20200522.mp4',
                position: 'relative',
            },
            fieldList: [
                { isCms: false, label: "地址", newProp:'', prop: "src", type: "input" },
                { isCms: false, label: "定位", newProp:'', prop: "position", type: "radio", list: 'positionList' },
            ],
            listTypeInfo:{
                positionList:[
                    {
                        label: 'relative',
                        value: 'relative'
                    },
                    {
                        label: 'absolute',
                        value: 'absolute'
                    },
                ],
            }
        },
    },
    {
        id: '3',
        label: '循环框',
        comKey: 'LoopBox',
        isSlot: true,
        src: 'https://phpimg.ziroom.com/e748cc0c-6b14-4f43-bcd3-c49ebb8c68a9.png',
        style: {
            width: "auto",
            height: 300
        },
        config: {
            data: {
                position: 'relative',
                num: 2,
                overflowY: 'auto'
            },
            fieldList: [
                { isCms: false, label: "定位", newProp: '', prop: "position", type: "radio", list: 'positionList' },
                { isCms: false, label: "循环个数", newProp: '', prop: "num", type: "inputNumber", controlsPosition: "right", min: 1 },
                { isCms: false, label: "可滚动", newProp:'', prop: "overflowY", type: "select", list: 'overflowList' },
            ],
            listTypeInfo:{
                positionList:[
                    {
                        label: 'relative',
                        value: 'relative'
                    },
                    {
                        label: 'absolute',
                        value: 'absolute'
                    },
                ],
                overflowList:[
                    {
                        label: 'auto',
                        value: 'auto'
                    },
                    {
                        label: 'hidden',
                        value: 'hidden'
                    },
                    {
                        label: 'scroll',
                        value: 'scroll'
                    },
                ],
            }
        },
    },
]