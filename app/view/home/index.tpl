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
</body>
</html>