var express = require('express'),
    app = express();

app.use(express.compress());

app.use(express.static(__dirname + '/public', { maxAge: 0}));

if (process.env.NODE_ENV === "production")
{
	app.listen(2060);
}
else
{
	app.listen(process.env.PORT || 8080);
}
//TODO: Handle filtering
//
