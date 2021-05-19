const http=require('http');
const app=require('./app');

app.set('port',process.env.PORT);
const server=http.createServer(app);

server.on('listening',function(){
    console.log('ok');
})

server.listen(process.env.PORT || 3000, ()=>{
    console.log('port is 3000');

});