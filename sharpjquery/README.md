## 编码习惯
-----------

0. 变量名区分：

    ```js
    js中变量名是允许包含$字符的；

    $variable ---> 往往代表一个jquery对象；

    variable  ---> 往往代表一个普通js变量；

    ```

1. $()函数功能很多：
    
    - $(document).ready()的简写形式;
        ```js
        // P8: 
        // window.onload = function(){}; 只能写一个
        // $(document).ready() 可以同时写多个
        $(function(){
            alert("Hello World!");
        })
        ```

    - 工厂函数：创建元素节点 == 将DOM元素转换成jquery对象
        ```js
        
        $("<ul><li>1</li><li>2</li></ul>"); # 返回一个jquery对象，用于插入到DOM中

        $($("#one")[0]);  # $() 将dom对象括起来，就转换成了jquery对象了

        ```

2. 函数的参数可以是一个函数定义语句，而不必须是一个变量（与Python不同）：

    - 参数是一个匿名函数：
        ```js
        $('ul li').click(
            function(){
                alert($(this).html());
            }
        );

        ```

    - 参数是一个赋值语句
        ```js
        $(function(){
            $("#btn").bind("click", myFun1=function(){$('#test').append("<p>我的绑定函数1</p>")})
                     .bind("click", myFun2=function(){$('#test').append("<p>我的绑定函数1</p>")})
                     .bind("click", myFun3=function(){$('#test').append("<p>我的绑定函数1</p>")});
        });
    ```

3. 元素集合，通过下标索引获取。就会变成DOM对象

    ```js
    $("body").children().length;

    var option_list = $("#multiple").children(); // 这不是一个一般的list，
    $("#multiple").children()[0];  // <option selected="selected">选择1号</option>

    for (i=0;i<option_list.length;i++){
        console.log(option_list[i].innerHTML);  # 这里的option_list[i]为什么不能使用html()等jquery方法？
    }
    ```

4. Jquery的事件方法名通常比JS原生方法少一个on

    |  num  |   js  | jquery |
    |-------|-------|--------|
    |  1  |   onload  | load |
    |  2  |   onclick  | click |


5. 数据绑定问题：

    > 页面上的两个input实时显示鼠标或者某个元素的坐标





## Sharp Jquery 
---------------

0. DOM对象与Jquery对象互相转化

    ``` js

    $("#one")[0];  # 非jquery对象，而是DOM元素本身，且包含当前样式,[0]可以完成jquery对象转换成DOM对象
        /*
        <div class="one" id="one" style="background: rgb(187, 255, 170);">
            id 为one，class为one的div
            <div class="mini">class为mini</div>
        </div>
        */

    $($("#one")[0]);  # $() 将dom对象括起来，就转换成了jquery对象了
    // 与$("#one")比较，二者同样是jquery对象，也不相同


    ```

1. 适用性高：

    - 很多方法同时适用于单个对象与多个对象
        ```js
        $("#one").css("background", "#bbffaa");
        // $(".one") 如果返回来一个对象就设置一个对象的css，返回多个对象就设置多个对象的css；

        ```

    - 当返回多个对象时，但后面跟了一个只能处理一个对象的方法时也不会报错，有的默认返回第一，有的会其他处理方式   
        ```js
        $("div:contains(di)").css("background", "#bbffaa").length;
        // 5
        $("div:contains(di)").css("background", "#bbffaa").html();  # 返回了第一个元素的div#one.one的内容
        /*
        id 为one，class为one的div
        <div class="mini">class为mini</div>
        */
        $("select :selected").text(); # 这个显示出了三个input的三个文本，三个文本一行显示
        // 湖南天津北京
        $("select :selected").html()
        // 湖南
        $("select :selected").length
        // 3

        $('.stat_table tr:nth-child(27)').text() # 这个显示出了tr内部5个<td></td>内的文本，每行显示一个文本
        /*
                  26
                  安徽省
                  1
                  3
                  0
       */
       $('.stat_table tr:nth-child(26)').html()
        /*
                  <td>25</td>
                  <td>宁夏回族自治区</td>
                  <td>2</td>
                  <td>2</td>
                  <td>0</td>
        */

        $('.stat_table tr:nth-child(27)').length
        // 1
        ```

    - 参数个数不同，执行的动作不同
        ```js
        $('p').text()  # 获取文本内容

        $('p').text("替换文本")  # 设置文本内容

        $('p').attr("attr_name")  # 获取attr_name的属性值
 
        $('p').attr("attr_name", "attr_value")  # 设置attr_name的属性值

        ```


2. 对于class,id 属性等名称包含了 #，.，]等特殊字符时需要使用【双反斜杠】转义

    ```js
    <div id="id#b">bb<div>

    $("#id\\#b")
    ```

3.  【难点】链式操作的返回值，取决于最后一个选择器方法的返回对象，这些纯操作函数（remove）不会影响最终返回的jquery对象

    ```js
        // remove() 会删除匹配到的元素，返回值取决于remove()函数前面作用的对象是什么，就返回什么。

        var $li_2 = $("ul li:eq(1)").remove();  # 删除第二个元素,并返回的是原始的$("ul li:eq(1)")对象
        $li_2.appendTo("ul"); # 将删除了的这个元素追加到ul内部的最后面

        $("ul li").remove("li[title!=菠萝]") # 删除二个元素,没有返回删除的元素的jquery对象，返回的是原始的$("ul li")对象

    ```

4. 链式操作，选择器方法("selector") 内继续使用选择器进一步选择

    ```js
    # css选择器 和 jquery的这些选择器方法 选择的过程都是一层一层细化筛选的，这些选择器就是筛选 范围或条件。

    find("#selector");

    var $parent = $(this).parents("div.v_show");
    $parent.find("div.v_caption .highlight_tip span").eq((page - 1)).addClass("current").siblings("span").removeClass("current");

    siblings("span")  // 元素的同辈元素中的span元素， siblings() 即获取所有的同辈元素

    ```


### Chapter 2 基本选择器
-----------------------

0. 2.3.1 基本选择器

    ```js

    $("#one").css("background", "#bbffaa");  # 这个函数最后还会把当前的对象返回来，因此可以进行链式操作。

        /*
        init [div#one.one, context: document, selector: "#one"]

            0: div#one.one
                    accessKey: ""
                align: ""
                assignedSlot: null
                attributeStyleMap: StylePropertyMap {size: 10}
                attributes: NamedNodeMap {0: class, 1: id, 2: style, class: class, id: id, style: style, length: 3}
                autocapitalize: ""
                baseURI: "file:///D:/PycharmProject/FrontEnd/sharpjquery/P30case.html"

            context: document
                URL: "file:///D:/PycharmProject/FrontEnd/sharpjquery/P30case.html"
                activeElement: body
                adoptedStyleSheets: []
                alinkColor: ""
                all: HTMLAllCollection(26) [html, head, title, script, style, body, div#one.one, div.mini, div#two.one, div.mini, div.mini, div.one, div.mini, div.mini, div.mini, div.mini, div.one, div.mini, div.mini, div.mini, div.mini, div.one, div.hide, div, input, span#mover, one: div#one.one, two: div#two.one, mover: span#mover]
                anchors: HTMLCollection []
                applets: HTMLCollection []
                baseURI: "file:///D:/PycharmProject/FrontEnd/sharpjquery/P30case.html"

            length: 1

            selector: "#one"

            __proto__: Object(0)
                add: ƒ (e,t)
                addBack: ƒ (e)
                addClass: ƒ (e)
                after: ƒ ()
                ajaxComplete: ƒ (e)
                ajaxError: ƒ (e)
                ajaxSend: ƒ (e)
                ajaxStart: ƒ (e)
                ajaxStop: ƒ (e)
                ajaxSuccess: ƒ (e)
                andSelf: ƒ (e)
        */

    $(".mini").css("background", "#bbffaa");
    $("div").css("background", "#bbffaa");
    $("*").css("background", "#bbffaa");
    $("span, #two").css("background", "#bbffaa");
    ```

1. 2.3.2 层次选择器
    
    - 子元素：特别注意 空格(后代选择器) 的使用
        ```js
        $("body div").css("background", "#bbffaa");  # 后代选择器，所有层级的子子子...元素

            /*
            init(18) [div#one.one, div.mini, div#two.one, div.mini, div.mini, div.one, div.mini, div.mini, div.mini, div.mini, div.one, div.mini, div.mini, div.mini, div.mini, div.one, div.hide, div, prevObject: init(1), context: document, selector: "body div"]
            0: div#one.one
            1: div.mini
            2: div#two.one
            3: div.mini
            4: div.mini
            5: div.one
            6: div.mini
            7: div.mini
            8: div.mini
            9: div.mini
            10: div.one
            11: div.mini
            12: div.mini
            13: div.mini
            14: div.mini
            15: div.one
            16: div.hide
            17: div
            context: document
            length: 18
            prevObject: init [document, context: document]
            selector: "body div"
            __proto__: Object(0)
            */

        $("body > div").css("background", "#bbffaa"); # 一级子元素
        ```

    - 同辈元素 选择器
        ```js
        $("#one + div").css("background", "#bbffaa"); #  #one的下一个div同辈元素
        $(".one + div").css("background", "#bbffaa");
        $(".one").next("div").css("background", "#bbffaa");

        $("#two ~ div").css("background", "#bbffaa"); #  #two的后面所有div同辈元素
        $("#two").nextAll("div").css("background", "#bbffaa");

        $("#two").siblings("div").css("background", "#bbffaa");  # #two的所有div同辈元素
        ```


2. 2.3.3 过滤选择器：

    - 基本过滤选择器：(顺序，状态)(冒号前面没有空格，代表是从已经选择到了元素集中选出要的元素)
        ```js
        $("div:first").css("background", "#bbffaa");

        $("div:last").css("background", "#bbffaa");

        $("div:even").css("background", "#bbffaa");   # 与$("div")获取的元素对比，注意观察div的顺序
        $("div:odd").css("background", "#bbffaa");
        $("div");


        $("div:eq(3)").css("background", "#bbffaa");  # 索引从0开始

        $("div:gt(3)").css("background", "#bbffaa");

        $("div:lt(3)").css("background", "#bbffaa");

        $("div:header").css("background", "#bbffaa");

        $("div:animated").css("background", "#bbffaa");

        $("div:not(.one)").css("background", "#bbffaa");

        $(":focus").css("background", "#bbffaa");   # 什么情况算是获取了焦点？

        ```

    - 内容过滤选择器：(是否包含元素)
        ```js

        $("div:contains(di)").css("background", "#bbffaa");  # 递归含有文本di的元素
        // $(":contains('title')").css("background", "#bbffaa");  整个body都被选择了

        $("div:empty").css("background", "#bbffaa");  # 既不包含子元素也不包含文本

        $("div:has('.mini')").css("background", "#bbffaa");  # 难于理解：选择含有.mini元素的父元素

        $("div:parent").css("background", "#bbffaa");  # 选择拥有子元素的元素，不含html标签只包含纯文本的也算,与:empty互为反选？
        $("span:parent");
        ```

    - 可见性过滤选择器：(可见不可见状态)
        ```js
        $("div:visible").css("background", "#bbffaa");

        $("div:hidden").show(3000);   # 逐渐显现动画3s， 元素包含display为none的元素和文本隐藏域<input type="hidden"/>

        $(":hidden");

        ```

    - 属性过滤选择器：(是否包含属性和属性值)
        ```js
        $("div[title]").css("background", "#bbffaa");
        // $("div:contains('title')").css("background", "#bbffaa");

        $("div[title=test]").css("background", "#bbffaa");


        $("div[title!=test]").css("background", "#bbffaa");


        $("div[title^=te]").css("background", "#bbffaa");


        $("div[title$=est]").css("background", "#bbffaa");


        $("div[id][title*=es]").css("background", "#bbffaa");  # 链式使用[]属性选择器：包含id属性，title属性值包含es的元素
        ```

    - 子元素过滤选择器： (冒号前面有空格，代表是从已经选择到了元素集中的每个元素，的子元素中选择)(比基本过滤选择器深一个层级)
        ```js

        $("div.one :nth-child(2)").css("background", "#bbffaa");   # 索引从1开始
        // $("div.one:nth-child(2)").css("background", "#bbffaa");  比较二者的区别

        $("div.one :first-child").css("background", "#bbffaa");

        $("div.one :last-child").css("background", "#bbffaa");

        $("div.one :only-child").css("background", "#bbffaa");  如果父元素包含唯一元素，那么就返回这个子元素
        // $("ul li:only-child") 在<ul>中选取是唯一子元素的<li>元素

        ```

    - 表单对象属性过滤选择器：
        ```js
        $("#form1 input:enabled").val("这里变化了！");

        $("#form1 input:disabled").val("这里变化了！");

        $("input:checked").length;

        $("select :selected").text(); # 这个显示出了三个input的三个文本，三个文本
        // 湖南天津北京
        ```

3. 2.3.4 表单选择器
    
    Jquery中专门加入了表单选择器    
    :input_type 根据输入框类型选择元素    

    ```js
    $("#form1 :input").length;  # 选择所有的input、textarea、select、button元素

    $("#form1 :text").length;

    $("#form1 :password").length;
    ```


### Chapter 3 DOM操作
---------------------

    DOM操作分3个方面： DOM Core，HTML-DOM和CSS-DOM

1. 3.2.1 查找节点：
    
    - 查找元素节点：
        ```js
        $("#id").text()
        $("select :selected").text(); # 这个显示出了三个input的三个文本，三个文本一行显示
        // 湖南天津北京
        $("select :selected").html()
        // 湖南
        $("select :selected").length
        // 3
        $('.stat_table tr:nth-child(27)').text() # 这个显示出了tr内部5个<td></td>内的文本，每行显示一个文本
        /*
                  26
                  安徽省
                  1
                  3
                  0
        */
        $('.stat_table tr:nth-child(26)').html()
        /*
                  <td>25</td>
                  <td>宁夏回族自治区</td>
                  <td>2</td>
                  <td>2</td>
                  <td>0</td>
        */
        $('.stat_table tr:nth-child(27)').length
        // 1
        ```

    - 查找属性节点：
        ```js
        $("#id").attr('attr_name');
        $("#id").attr('attr_namme', 'attr_value');
        ```


2. 3.2.2 创建节点： 

    - 创建元素节点：
        ```js
        var $li_obj = $("<li></li>");
        $("ul").append($li_obj);
        ```

    - 创建文本节点：
        ```js
        var $li_obj = $("<li>文本内容</li>");
        $("ul").append($li_obj);
        ```

    - 创建属性节点：
        ```js
        var $li_obj = $("<li title="属性值">文本内容</li>");
        $("ul").append($li_obj);
        ```


3. 3.2.3 插入节点：

    ```js
    var $li_obj = $("<li title="属性值">文本内容</li>");
    $("ul").append($li_obj);
    $("ul").append("<li title="属性值">文本内容</li>");  # 也可以直接写html代码到append里

    $('.stat_table tr:nth-child(26)').before($('.stat_table tr:nth-child(27)'));

    # 内部前后面追加
    .append()
    .appendTo()
    .prepend()
    .prependTo()

    # 外部前后面插入
    .after()
    .insertAfter()
    .before()
    .insertBefore()
    ```

4. 3.2.4 删除节点：

    - remove() 【难点】会删除匹配到的元素，返回值取决于remove()函数前面作用的对象是什么，就返回什么。
        ```js
        var $li_2 = $("ul li:eq(1)").remove();  # 删除第二个元素,并返回这个元素的jquery对象
        $li_2.appendTo("ul"); # 将删除了的这个元素追加到ul内部的最后面

        $("ul li").remove("li[title!=菠萝]") # 删除二个元素,没有返回删除的元素的jquery对象，返回的是$("ul li")对象
        ```

    - detach() 删除元素但是仍保留元素绑定的事件，附加数据等信息（remove不会保存这些信息）
        ```js
        $('ul li').click(function(){
            alert($(this).html());
        });

        var $li = $('ul li:eq(1)').detach();
        $li.appendTo('ul');  # 可通过chrome 的 elements的 eventlisteners来查看元素绑定了哪些事件

        ```

    - empty() 清空元素里的所有后代元素
        ```js
        $('ul li:eq(1)').empty();
        ```

5. 3.2.5 复制节点
    ```js

    $('ul li').click(function(){
        $(this).clone().appendTo($("ul"));
    })

    $('ul li').click(function(){
        $(this).clone(true).appendTo("ul");  # clone(true)会同时复制元素的行为
    })

    ```

6. 3.2.6 替换节点

    ```js
    $('p').replaceWith("<strong>你最不喜欢的水果是?</strong>");

    $("<strong>你最不喜欢的水果是?</strong>").replaceAll('p');
    ```

7. 3.2.7 包裹节点

    - wrap() and wrapAll()
        ```js
        $("p").replaceWith("<strong>你最不喜欢的水果是?</strong>");
        $('strong').clone().insertAfter($('strong'));


        $("strong").wrap("<b></b>");

        $("strong").wrapAll("<p></p>");  # 当这些 strong 元素不是连续的元素时，wrapAll会出现一些问题
        ```

    - wrapInner()
        ```js
        $('strong').wrapInner("<b></b>");
        ```

8. 3.2.8 属性操作

    - attr() 获取和设置属性
        ```js
        $("p").attr("title"); # 获取属性

        $("p").attr("title", "your title"); # 设置属性

        $("p").attr({"title":"your title", "name":"your name"}); # 同时设置多个属性
        ```

    - removeAttr() 删除属性
        ```js
        $("p").removeAttr("title");
        ```

9. 3.2.9 样式操作（通过添加减少替换class来操作）

    - 获取样式和设置样式
        ```js
        $("p").addClass("myClass"); # 追加样式

        $("p").attr("class");

        $("p").attr("class", "high");  # 使用high替换原myClass
        ```

    -  移除样式
        ```js

        $("p").removeClass("myClass");

        $("p").removeClass("high").removeClass("another");  # 链式操作

        $("p").removeClass("high another");  # 空格隔开多值

        $("p").removeClass();  # 注意：移除所有class

        ```

    - 切换样式
        ```js
        $("p").toggleClass("myclass");  # 追加和移除myclass

        ```

    - 判断是都含有某个样式
        ```js
        $("p").toggleClass("myclass");
        $("p").hasClass('myclass');
        $("p").toggleClass("myclass");
        ```

10. 3.2.10 设置和获取HTML、文本和值

    - html()方法
        ```js
        var p_html = $("p").html();
        alert(p_html);

        $("p").html("New Html content <strong>也可以是代码偶！</strong>")
        ```

    - text()方法
        ```js
        var p_text = $('p').text();
        alert(p_text);
        $("p").text("New Html content <strong>html代码不会被翻译！</strong>");
        ```

    - val()方法: 获取设置表单值（包括select，checkbox的选项被选中）
        ```js
        // 获得焦点
        $("#address").focus(function(){
            var text_value = $(this).val();
            if (text_value == "请输入邮箱地址"){
                $(this).val("");
            }
        })
        // this.defaultValue
        $("#address").focus(function(){
            var text_value = $(this).val();
            if (text_value == this.defaulValue){
                $(this).val("");
            }
        })

        // 失去焦点
        $("#address").blur(function(){
            var text_value = $(this).val();
            if (text_value == ""){
                $(this).val("请输入邮箱地址");
            }
        })

        // 设置选项被选中
        $("#single").val("选择2号");
        $("#multiple").val(["选择2号", "选择3号"]);

        $(":checkbox").val(["check1", "check2"]);
        $(":radio").val(["radio2"]);

        // 同等方法
        $("#single option:eq(1)").attr("selected", true);
        $("#single option:eq(2)").attr("selected", "selected");

        $("[value=radio2]:radio").attr("checked", true);
        $("[value=radio3]").attr("checked", true);
        ```


11. 3.2.11 遍历节点

    - children()方法
        ```js
        $("body").children().length;

        var option_list = $("#multiple").children();
        $("#multiple").children()[0];
        // <option selected="selected">选择1号</option>

        for (i=0;i<option_list.length;i++){
            console.log(option_list[i].innerHTML);  # 这里的option_list[i]为什么不能使用html()等jquery方法？
        }
        ```

    - next()方法
        ```js
        获取紧邻匹配到的元素后的同辈元素
        ```

    - prev()方法
        ```js
        获取紧邻匹配到的元素前的同辈元素
        ```

    - siblings()方法
        ```js
        获取紧邻匹配到的元素前后的所有同辈元素
        $("#multiple option:contains(2)").siblings().length;
        ```

    - closest()
        ```js
        $(document).bind("click", function(e){
            $(e.target).closest("li").css("color", "red");
        })

        ```

    - parent(), parents()与closest()的区别
        ```js
        parent()   一级父元素
        parents()  多级父元素

        var $parent = $(this).parents("div.v_show");
        ```


12. 3.2.12 CSS_DOM 操作：

    > 读取和设置style对象的各种属性  
    > 注意css中那些带-的样式，使用时需要转换成小驼峰格式：
    > font-size fontSize; background-color  backgroundColor

    -  css()获取得是样式
        ```js
        $("p").css("color");

        $("p").css("color", "red");

        $("p").css({"color":"red", "fontSize":"30px"});

        $("p").css("height"); # 获取到的样式，可能会出现auto

        ```

    - 获取实际宽高方法
        ```js
        $("p").height(); # 获取到的是实际高度 XX 像素;
        $("p").width();
        ```

    - offset() 当前视窗的相对偏移【绝对位置】
        ```js
        var position = $("p").offset();  # 对象包含两个属性，top和left，左上角是（0，0），当前位置（top， left）
        var left = position.left;
        var top = position.top;
        ```

    - position()方法 获取的是与最近的一个设置了relative或者absolute的祖父节点元素的相对偏移【相对位置】
        ```js
        var position = $("p").position();
        var left = position.left;
        var top = position.top;
        ```

    - scrollTop() 和 scrollLeft() 有问题
        ```js
        $("ul").after($("<textarea></textarea>"));
        $("textarea").scrollTop(300);
        $("textarea").scrollLeft(300);
        ```



### Chapter 4：
---------------

#### 4.1 Jquery 事件

0. 4.1.1 加载DOM

    ```js
    # DOM 树准备就绪后就执行
    # 同一个页面可以使用多次
    # 这个函数直接放到console上是不能执行的应为，DOM加载事件已经完成不会再次触发
    $(document).ready(function(){
        alert("DOM 树准备就绪");
    })
    // 简写方式
    $(function(){
        alert("DOM 树准备就绪");
    });

    # load 方法可以限制对象（窗口，文档，单个元素，图片）完全加载完毕后，触发
    $(window).load(function(){
        alert("Load completely!");
    })
    // 等价js原生写法，同一个页面只可以使1次
    window.onload = function(){
        alert("Load completely!");   
    }

    ```

1. 4.1.2 事件绑定

    > bind(enven_type [, data], fn)   
    > blur focus load resize scroll unload click dbclick mousedown mouseup mousemove mouseover mouseout  
    > 同一元素可以绑定多个事件


    - 基本效果
        ```js
        $(document).ready(function(){
            $("#panel h5.head").bind("click", function(){
                $(this).next().show();
            });
        });

        ```

    - 加强效果
        ```js

        $(document).ready(function(){
            $("#panel h5.head").bind("click", function(){
                var $content = $(this).next();
                if ($content.is(":visible")){
                    $content.hide();
                } else {
                    $content.show();
                }
                
            });
        });

        ```

    - 改变绑定事件的类型
        ```js
        $(document).ready(function(){
            $("#panel h5.head").bind("mouseover", function(){
                $(this).next().show();      
            }).bind("mouseout", function(){
               $(this).next().hide(); 
            });
        });
        ```

    - 简写绑定事件
        ```js
        $(document).ready(function(){
            $("#panel h5.head").mouseover(function(){
                $(this).next().show();      
            }).mouseout(function(){
               $(this).next().hide(); 
            });
        });
        ```

2. 4.1.3 合成事件

    - hover(fn_enter,fn_leave) 鼠标一定悬停与取消
        ```js
        $("#panel h5.head").hover(function(){
            $(this).next().show();
        }, function(){
            $(this).next().hide();
        });

        ```

    - toggle(fn_enter,fn_leave) 单击切换
        ```js
        $("#panel h5.head").toggle(function(){
            $(this).next().show();
        }, function(){
            $(this).next().hide();
        });

        $("#panel h5.head").toggle(function(){
            $(this).next().toggle(); // 还可以直接切换元素的显示与否
        }, function(){
            $(this).next().toggle();
        });

        ```

    - 先写样式，后分配给元素的class
        ```js

        $("#panel h5.head").toggle(function(){
            $(this).next().addClass('highlight'); // 还可以直接切换元素的显示与否
            $("#panel h5.head").next().show();
        }, function(){
            $(this).next().removeClass('highlight');
            $("#panel h5.head").next().hide();
        });

        ```


3. 4.1.4 事件冒泡

    > 事件会按照DOM的层次结构向水泡一样不断向上直至顶端

    - 由内向外冒泡
        ```js
        $(function(){
            $("span").bind("click", function(){
                var txt = $("#msg").html() + "<span>1 内部的span元素被点击</span><br/>";
                $("#msg").html(txt);
            });

            $("#content").bind("click", function(){
                var txt = $("#msg").html() + "<span>2 外层的的div元素被点击</span><br/>";
                $("#msg").html(txt);
            });

            $("body").bind("click", function(){
                var txt = $("#msg").html() + "<span>3 外层的的body元素被点击</span><br/>";
                $("#msg").html(txt);
            });
        });
        ```

    - 事件冒泡引发的问题
        - 事件对象
            ```js
            // 当事件被触发时，事件对象event就会传递给函数，函数结束，事件对象就会被销毁
            $('element_selector').bind('click', function(){
                // ...

                // 触发函数内使用：return false 可以同时阻止 事件冒泡 和 默认的触发行为
            })

            ```

        - 阻止事件冒泡
            ```js
            $("span").bind("click", function(event){
                var txt = $("#msg").html() + "<span>1 内部的span元素被点击</span><br/>";
                $("#msg").html(txt);
                event.stopPropagation();
            });

            # 绑定click事件的简写方法，其他事件绑定(下面的mouseover,focus等)都可以这样简写
            $("span").click(function(event){
                var txt = $("#msg").html() + "<span>1 内部的span元素被点击</span><br/>";
                $("#msg").html(txt);
                event.stopPropagation();
            });

            ```

        - 阻止事件触发的元素的默认行为（表单提交）
            ```js
            // 阻止表单提交按钮被点击后自动提交的行为
            $("#sub").bind("click", function(event){
                var username = $("input[name=username]").val();
                if (username==""){
                    $("#msg").html("<p>文本框的值不能为空</p>");
                    event.preventDefault();  
                };
            });
            ```

        - Jquery不支持事件捕获


4. 4.1.5 事件对象event的属性及方法

    - event.type
    - event.preventDefault()
    - event.stopPropagation()
    - event.target
        ```js
        获取事件对象
        ```
    - event.relatedTarget
    - event.pageX 和 event.pageY  位置与事件相关
        ```js
        当前鼠标光标的坐标：

        ```
    - event.which
        ```js
        获取键位，包括鼠标左中右

        $("a").mousedown(function(e){
            alert(e.which);
        })

        $("input").keyup(function(e){
            alert(e.which);
        })
        ```

    - event.metaKey

5. 4.1.6 移除事件：
    
    ```js
    $("body").unbind("click");

    $(function(){
        $("#btn").bind("click", myFun1=function(){
            $('#test').append("<p>我的绑定函数1</p>")
        }).bind("click", myFun2=function(){
            $('#test').append("<p>我的绑定函数1</p>")
        }).bind("click", myFun3=function(){
            $('#test').append("<p>我的绑定函数1</p>")
        })
    });

    $("#delTwo").click(function(){
        $("#btn").unbind("click", myFun2);  # 删除其中一个事件
    })


    ```
6. 4.1.7 模拟操作

    ```js
    $("#btn").trigger("click");
    //简写成 $("#btn").click();


    $("#btn").bind("custom_event", function(){
        $("#test").append("<p>定义了自定义事件！</p>");
    })
    $("btn").trigger("custom_event"); # 自定义事件只能手动模拟触发；


    # trigger(type[, data])
    $("#btn").trigger(event_type, args)


    # trigger() 方法触事件后，会执行浏览器的默认操作
    $("input").trigger("focus"); 触发focus事件且input获得焦点

    $("input").triggerHandler("focus");  仅仅触发focus事件input不会获取焦点，也就是阻止了浏览器的默认操作
    ```

7. 其他用法

    - 绑定多个事件类型
        ```js
        $(function(){
            $("div").bind("mouseover mouseout", function(){
                $(this).toggleClass("over");
            })
        });

        $(function(){
            $("div").bind("mouseover", function(){
                $(this).toggleClass("over");
            }).bind("mouseout", function(){
                $(this).toggleClass("over");
            })
        });

        ```

    - 添加事件命名空间，便于管理
        ```js
        $(function(){
            $("div").bind("mouseover.namespace1", function(){
                $(this).toggleClass("over");
            }).bind("mouseout.namespace2", function(){
                $(this).toggleClass("over");
            }).bind("click.namespace1", function(){
                $(this).toggleClass("over");
            })
        });

        $("div").unbind("mouseover.namespace1");
        ```

    - 相同的事件名称，同时触发
        ```js
        $("div").trigger("click!"); # !这里的作用是，只触发不包含命名空间的click；

        ```

#### 4.2 Jquery 动画


1. show() 和 hide()

    - 不带参数
        ```js
        // 等同于如下代码
        .css("display", "none/block/inline")
        ```

    - 可选的参数
        ```js
        $("element").show(1000); # 数字单位是毫秒
        $("element").hide(1000); # 数字单位是毫秒

        $("element").show("slow"); # 数字单位是毫秒
        $("element").hide("normal"); # 数字单位是毫秒
        ```

2. fadeIn() 和fadeOut()
    
    通过改变不透明度显示隐藏元素,直至diplay：none


3. slideUp() 和 slideDown()

    - slideUp()    （窗帘）上拉，由下到上缩短隐藏 ,直至diplay：none
    - slideDown()  （窗帘）下拉，由上之下延伸展示

4. animate() 自定义动画--较复杂

    > 格式：  animate(params, speed, callback) 
    > params:包含样式属性及值的映射 {"property1": "value1", "property2": "value2"}   
    > 可选参数，速度  
    > 可选参数，动画完成时执行的函数  
    > 注意为了能影响该元素的top left bottom right 样式属性，需要把元素的relative设置成relative
    > 这里的top left bottom的值是什么值？相对位置or绝对位置？怎样制定数值类型？

    - 好像执行了一次，再次点击就不动了,不能连续点击
        ```js
        // left的这个值500px到底是什么意思呢？
        $(function(){
            $("#panel").click(function(){
                $(this).animate({"left":"500px"}, 3000);
            })
        });
        ```

    - 累加、累减动画,单个动画（多个animate函数时，不会累计加减）
        ```js
        $(function(){
            $("#panel").click(function(event){
                $(this).animate({"left":"+=500px"}, 300);
                console.log("left:" + event.pageX);
                console.log("top:" + event.pageY);
            })
        });

        // 为什么这里是可以连续点击的
        // 累加累减的计算方法？？
        $("#panel").click(function(){

            function update(){
                $("#coordinate input:eq(0)").val($("#panel").position().left);
                $("#coordinate input:eq(1)").val($("#panel").position().top);
                $("#coordinate input:eq(2)").val($("#panel").offset().left);
                $("#coordinate input:eq(3)").val($("#panel").offset().top); 
            }

            update();
            $(this).animate({"left":"500px"}, 3000, update)
                   .animate({"top":"500px"}, 3000, update)
                   .animate({"left":"-=400px"}, 3000, update)
                   .animate({"top":"-=400px"}, 3000, update);
        })
        ```

    - 多重动画
        ```js
        $("#myImg").click(function(){
            $(this).animate({"left":"500px", "height":"200px"}, 3000);
        })
        ```

    - 按顺序执行多个动画
        ```js
        $("#myImg").click(function(){
            $(this).animate({"left":"500px"}, 3000)
                   .animate({"height":"200px"}, 3000);
        })

        // 为什么这里是可以连续点击的
        $("#panel").click(function(){
            $(this).animate({"left":"500px"}, 3000)
                   .animate({"top":"500px"}, 3000)
                   .animate({"left":"-=500px"}, 3000)
                   .animate({"top":"-=500px"}, 3000);
        })
        ```

    - 综合动画
        ```js
        $(function(){
            $("#panel").css("opacity", "0.5");
            $("#panel").click(function(){
                $(this).animate({"left":"400px","height":"200px","opacity":"1"}, 3000)
                       .animate({"top":"200px", "width":"200px"}, 3000)
                       .fadeOut("slow");
            })
        })
        ```

5. 4.2.5 动画回调函数

    - css方法并不会被加入到动画队列中
        ```js
        $(function(){
            $("#panel").css("opacity", "0.5");
            $("#panel").click(function(){
                $(this).animate({"left":"400px","height":"200px","opacity":"1"}, 3000)
                       .animate({"top":"200px", "width":"200px"}, 3000)
                       .css("border", "5px solid blue");  # 样式改变在click事件开始时就执行了
            })
        })

        ```

    - 想要在动画结束时完成样式调整需要使用回调函数
        ```js
        $(function(){
            $("#panel").css("opacity", "0.5");
            $("#panel").click(function(){
                $(this).animate({"left":"400px","height":"200px","opacity":"1"}, 3000)
                       .animate({"top":"200px", "width":"200px"}, 3000, function(){
                            $(this).css({"border":"5px solid blue"})
                       });
            });
        })

        ```

6. 4.2.6 停止动画和判断是否处于动画状态


    - 停止元素的动画
        ```js
        stop([,ClearQueue], [,gotoEnd])
        // ClearQueue: 可选参数，需要清空的未完成的动画队列
        // gotoEnd:  可选参数，是否将正在执行的动画跳转到末状态
        // stop()

        $("#panel").unbind("click");


        // 这里非常有意思，多次移入移除鼠标，事件动画会自动排序，依次执行,后面会讲到这个bug(动画队列的原因)
        $("#panel").hover(function(){
            $(this).animate({"left":"150"}, 10000);
        },function(){
            $(this).animate({"left":"8"}, 10000);
        })


        // 书鼠标移出时，立即结束当前动画,多次尝试移入移除，动画会立即切换左右移动方向
        $("#panel").hover(function(){
            $(this).stop().animate({"left":"150"}, 10000);
        },function(){
            $(this).stop().animate({"left":"8"}, 10000);
        })


        // 书鼠标移出时，没有参数的stop()只能立即结束当前动画,所以它会首先下移，而不是执行鼠标移出动画，左移
        $("#panel").hover(function(){
            $(this).stop().animate({"left":"150"}, 10000)
                          .animate({"top":"150"}, 10000);
        },function(){
            $(this).stop().animate({"left":"8"}, 10000);
        })


        // 书鼠标移出时，没有参数的stop(true)只能立即结束当前事件的所有动画,所以立即执行鼠标移出动画左移
        $("#panel").hover(function(){
            $(this).stop(true).animate({"left":"150"}, 10000)
                          .animate({"top":"150"}, 10000);
        },function(){
            $(this).stop().animate({"left":"8"}, 10000);
        })
        ```

    - 判断元素是否处于动画状态
        ```js
        if (! $('#element')).is(":animated"){
                    // do-something
        }
        ```
    - 延迟动画
        ```js
        $(this).animate({left:"400px", height:"200px", opacity:"1"}, 3000)
        .delay(1000)
        .animate({top:"200px", width:"200px"}, 3000)
        .delay(2000)
        .fadeOut("slow");
        ```

7. 动画方法概括：
    
    - 下面的动画内部实质上都调用了animate()：

        - hide()

        - show()

        - fadeIn()

        - fadeOut()

        - toggle()

        - slideToggle()

        - fadeTo()

        - fadeToggle()

        - animate()
        

    - 动画队列：

        - 一组元素上的动画效果：

        - 多组元素上的动画效果：


    - 实例：P134case.html的css，js都非常值得学习
        ```js
        # javascript的动画和、CSS密不可分

        $(document).ready(function(){
            var page = 1;
            var i = 4; 
            $("span.next").click(function(){
                var $parent = $(this).parents("div.v_show"); // 多级父元素,中选择div class为v_show的元素集
                var $v_show = $parent.find("div.v_content_list");
                var $v_content = $parent.find("div.v_content");

                var v_width = $v_content.width();
                var len = $v_content.find("li").length;
                var page_count = Math.ceil(len / i);

                if (! $v_show.is(":animated")){
                    if (page == page_count){
                        $v_show.animate({left: '0px'}, "slow");
                        page = 1;
                    } else {
                        $v_show.animate({left: '-=' + v_width}, "normal");
                        // $v_content.animate({left: '-=' + v_width}, "normal");   不是v_content的动画，试试有什么区别
                        page += 1;
                    }
                    // $parent.find("div.v_caption highlight_tip span:eq((page - 1)").addClass("current").siblings().removeClass("current");
                    $parent.find("div.v_caption .highlight_tip span").eq((page - 1)).addClass("current").siblings("span").removeClass("current");
                }
               
            });

            $("span.prev").click(function(){
                var $parent = $(this).parents("div.v_show"); // 多级父元素,中选择div class为v_show的元素集
                var $v_show = $parent.find("div.v_content_list");
                var $v_content = $parent.find("div.v_content");

                var v_width = $v_content.width();
                var len = $v_content.find("li").length;
                var page_count = Math.ceil(len / i);

                if (! $v_show.is(":animated")){
                    if (page == 1){
                        $v_show.animate({left: '-=' + (page_count - 1) * v_width}, "slow");
                        page = page_count;
                    } else {
                        $v_show.animate({left: '+=' + v_width}, "normal");
                        // $v_content.animate({left: '-=' + v_width}, "normal");   不是v_content的动画，试试有什么区别
                        page -= 1;
                    }
                    // $parent.find("div.v_caption highlight_tip span:eq((page - 1)").addClass("current").siblings().removeClass("current");
                    $parent.find("div.v_caption .highlight_tip span").eq((page - 1)).addClass("current").siblings("span").removeClass("current");
                }
               
            });
        });

        ```









