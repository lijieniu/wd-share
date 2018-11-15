<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>首页</title>
</head>
<body>
    <ul>
        {% for item in list %}
        <li>{{item.title}}-{{helper.relativeTime(item.time)}}</li>
        {% endfor %}
    </ul>
    <form method="POST" action="/upload?_csrf={{ ctx.csrf | safe}}" enctype="multipart/form-data">
        title: <input name="title"/>
        file: <input name="file" type="file"/>
        <button type="submit">upload</button>
    </form>
    请输入关键字：<input id="search_input"> <button id="search_btn">搜索</button>
    <script>
        // 监听页面crash
        window.addEventListener('load', () => {
            sessionStorage.setItem('good_exit', 'pengding');
            setInterval(() => {
                sessionStorage.setItem('time_before_crash', Date.now().toString());
            }, 1000);
        });
        window.addEventListener('beforeunload', () => {
            sessionStorage.setItem('good_exit', 'true');
        });
        if(sessionStorage.getItem('good_exit') && sessionStorage.getItem('good_exit') !== 'true') {
            alert('Hey, welcome back from crash');
        }
        function debounce(fn, delay, immediate) {
            let timer = null;
            return function() {
                const context = this;
                const args = arguments;
                timer && clearTimeout(timer);

                if(immediate) {
                    const doNow = !timer;
                    timer = setTimeout(() => {
                        timer = null;
                    }, delay);
                    doNow && fn.apply(context, args);
                } else {
                    timer = setTimeout(() => {
                        fn.apply(context, args);
                    }, delay);
                }
            }
        }

        let searchInput = document.getElementById('search_input');
        function doSearch() {
            console.log(searchInput.value)
        }
        searchInput.addEventListener('input', debounce(doSearch, 5000));
        document.getElementById("search_btn").addEventListener('click', debounce(doSearch, 2000, true));
    </script>
</body>
</html>