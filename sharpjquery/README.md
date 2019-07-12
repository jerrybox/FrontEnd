### 编码习惯

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



### Sharp Jquery 


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


    ```

1. 适用性高：

    - 方法同时适用于单个对象与多个对象
        ```js
        $("#one").css("background", "#bbffaa");
        // $(".one") 如果返回来一个对象就设置一个对象的css，返回多个对象就设置多个对象的css；

        ```

    - 当返回多个对象时，但后面跟了一个只能处理一个对象的方法时也不会报错，有的默认返回第一，有的会其他处理方式
        ```js
        $("div:contains(di)").css("background", "#bbffaa").length
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

3.  链式操作的返回值，取决于最后一个选择器方法的返回对象，这些纯操作函数（remove）不会影响最终返回的jquery对象

    ```js
        // remove() 会删除匹配到的元素，返回值取决于remove()函数前面作用的对象是什么，就返回什么。

        var $li_2 = $("ul li:eq(1)").remove();  # 删除第二个元素,并返回的是原始的$("ul li:eq(1)")对象
        $li_2.appendTo("ul"); # 将删除了的这个元素追加到ul内部的最后面

        $("ul li").remove("li[title!=菠萝]") # 删除二个元素,没有返回删除的元素的jquery对象，返回的是原始的$("ul li")对象

    ```



#### Chapter 2 基本选择器


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


2. 2.3.3 过滤选择器，伪类选择器：

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
    
    > Jquery中专门加入了表单选择器  
    > :input_type 根据输入框类型选择元素  

    ```js
    $("#form1 :input").length;  # 选择所有的input、textarea、select、button元素

    $("#form1 :text").length;

    $("#form1 :password").length;
    ```


### Chapter 3 DOM操作


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

    - remove() 会删除匹配到的元素，返回值取决于remove()函数前面作用的对象是什么，就返回什么。
    ```js
    var $li_2 = $("ul li:eq(1)").remove();  # 删除第二个元素,并返回这个元素的jquery对象
    $li_2.appendTo("ul"); # 将删除了的这个元素追加到ul内部的最后面

    $("ul li").remove("li[title!=菠萝]") # 删除二个元素,没有返回删除的元素的jquery对象，返回的是$("ul li")对象
    ```

5. 






