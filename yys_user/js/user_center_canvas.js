
function createCanvas(){
                    $.ajax({
                        type:'GET',
                        url:'/order/buystat',
                        data:data,
                        success:function(data){
                            var w=700,h=500;
                            c1.width=w;
                            c1.height=h;
                            var ctx=c1.getContext('2d');
                            var boxPadding=50;
                            var charPadding=5;
                            /****绘制坐标***/
                            console.log('绘制');
                            ctx.beginPath();
                            ctx.moveTo(boxPadding-5,boxPadding+8);
                            ctx.lineTo(boxPadding,boxPadding);
                            ctx.lineTo(boxPadding+5,boxPadding+8);
                            ctx.moveTo(boxPadding,boxPadding);
                            ctx.lineTo(boxPadding,h-boxPadding+1);
                            ctx.moveTo(w-boxPadding+10-8,h-boxPadding+1-5);
                            ctx.lineTo(w-boxPadding+10,h-boxPadding+1);
                            ctx.lineTo(w-boxPadding+10-8,h-boxPadding+1+5);
                            ctx.moveTo(w-boxPadding+10,h-boxPadding+1);
                            ctx.lineTo(boxPadding,h-boxPadding+1);
                            ctx.fillStyle="#222";
                            ctx.stroke();
                            console.log('绘制结束');

                            /*****************/
                            var chartW=((w-2*boxPadding)/data.length)-2*charPadding;
                            for(var i=1,max=data[0].value;i<data.length;i++){
                                (data[i].value>max)&&(max=data[i].value);
                            }
                            var maxStr=max.toString();
                            var weishu=max%(Math.pow(10,(maxStr.length-1)));
                            var shouwei=parseInt(max/Math.pow(10,(maxStr.length-1)));
                            var maxcol=shouwei+1;
                            var newmax=Math.pow(10,(maxStr.length-1))*maxcol/colLen;
                            /*****绘制横线****/
                            var colW=(h-2*boxPadding)/colLen;
                            for(var j=0;j<colLen;j++){
                                ctx.beginPath();
                                ctx.moveTo(boxPadding,h-boxPadding-(j+1)*colW);
                                ctx.lineTo(w-boxPadding+10,h-boxPadding-(j+1)*colW);
                                ctx.strokeStyle="#ccc";
                                ctx.stroke();

                                /*****纵坐标**/
                                var colStr=String((j+1)*newmax);
                                var colSTtrW=ctx.measureText(colStr).width;
                                ctx.textBaseline="top";
                                ctx.fillText(colStr,boxPadding-colSTtrW-5,h-boxPadding-(j+1)*colW-fontSize/2);

                            }
                            var colStr=String(0);
                            var colSTtrW=ctx.measureText(colStr).width;
                            ctx.textBaseline="top";
                            ctx.fillText(colStr,boxPadding-colSTtrW-5,h-boxPadding-fontSize/2);

                            /****************/

                            for(var i=0;i<data.length;i++){
                                var chartH=((h-2*boxPadding)/colLen)*data[i].value/newmax;
                                var x=i*(w-2*boxPadding)/data.length+charPadding+boxPadding;
                                var y=h-boxPadding-chartH;
                                var str=String(data[i].value);
                                var strW=ctx.measureText(str).width;
                                var g=ctx.createLinearGradient(x,y,x,y+chartH);
                                g.addColorStop(0,'#e4393c');
                                g.addColorStop(1,'#fff');
                                ctx.fillStyle=g;
                                ctx.fillRect(x,y,chartW,chartH);
                                ctx.textBaseline="top";
                                ctx.font="bold "+fontSize+"px sans-serif";
                                ctx.fillStyle="#222";
                                ctx.fillText(str,(chartW-strW)/2+x,y-fontSize-2);
                                var mStr=data[i].label;
                                var mStrW=ctx.measureText(mStr).width;
                                console.log(mStr);
                                ctx.fillText(mStr,(chartW-mStrW)/2+x,h-boxPadding+2);
                            }

                        }
                    })
                };
