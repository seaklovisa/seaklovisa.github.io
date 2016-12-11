/**************************
請問老師，如不用全域物件，較佳的寫法應該為？

**************************/
var gameObject = (function($) {
    //var answer = "1124";
    //var result = "4211";
    var answer,
        answerObj,
        resultObj,
        tmpAnswer = "",
        tmpResult = "",
        answerArr, resultArr,
        i = 0,
        aMatch = 0,
        bMatch = 0,
        tmpVal,
        numberArr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

    var GroupObject = function(val) {
        this.value = val;
        this.len = val.length;
    };

    //字串轉換成計數陣列
    GroupObject.prototype.groupArray = function(totalVal) {
        var valArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            i = 0;

        for (i = 0; i < totalVal.length; i++) {
            valArr[parseInt(totalVal[i], 10)]++;
        }

        return valArr;
    };

    return {
        //產生答案
        init: function() {
            result = "";
            i = 4;
            numberArr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

            //產生不重複四個數字
            while (i > 0) {
                tmpVal = Math.floor(Math.random() * 9);

                if (numberArr[tmpVal] === 1) {
                    result += (tmpVal + "");
                    numberArr[tmpVal]--;
                    i--;
                }
            }

            resultObj = new GroupObject(result);
        },
        guessGame: function(answer) {
            numberArr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
            answerObj = new GroupObject(answer);
            tmpAnswer = "";
            tmpResult = "";
            aMatch = 0;
            bMatch = 0;

            //判斷A
            for (i = 0; i < answerObj.len; i++) {
                //完全一樣是A
                if (answerObj.value[i] === resultObj.value[i]) {
                    aMatch += 1;
                    //非A 去B判斷
                } else {
                    tmpAnswer += answerObj.value[i].toString();
                    tmpResult += resultObj.value[i].toString();
                }
            }

            //0-9的計數陣列
            answerArr = answerObj.groupArray(tmpAnswer);
            resultArr = resultObj.groupArray(tmpResult);

            //判斷B
            for (i = 0; i < tmpAnswer.length; i++) {
                if (resultArr[parseInt(tmpAnswer[i], 10)] !== 0) {

                    bMatch += 1;
                    resultArr[parseInt(tmpAnswer[i], 10)] -= 1;
                }
            }


            console.log(aMatch + "A" + bMatch + "B");
            console.log(result);
            return aMatch + "A" + bMatch + "B";
        }
    };
}(jQuery));

//事件綁定
(function($) {
    $(function() {
        var $answer = $("#answer"), //答案區
            $numericButtons = $("#input > div > div"), //數字鈕
            $clearBtn = $("#clearBtn"), //清除
            $guessBtn = $("#guessBtn"), //猜猜
            $resetBtn = $("#resetBtn"), //重置
            $log = $("#log"), //log區
            tmpVal,
            counter = 0,
            logText, answerText, result, numberArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            $numericButtonsOnClick = function(e) {
                tmpVal = $(this).text();
                answerText = $answer.text();
                if (numberArr[tmpVal] === 0 && answerText.length < 4) {

                    numberArr[tmpVal]++;
                    $answer.text($answer.text() + $(this).text());
                }
            },
            $clearBtnOnClick = function(e) {
                $answer.empty();
                numberArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            },
            $resetBtnOnClick = function(e) {
                numberArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                $answer.empty();
                $log.empty();
                gameObject.init();
            },
            $guessBtnOnClick = function(e) {

                logText = $log.text();
                answerText = $answer.text();

                if (answerText.length === 4) {
                    result = gameObject.guessGame(answerText) || "";
                    $log.text(logText + "  " + (++counter) + "." + answerText + "-" + result + "");
                }

            };

        $numericButtons.on('click', $numericButtonsOnClick);
        $clearBtn.on('click', $clearBtnOnClick);
        $resetBtn.on('click', $resetBtnOnClick);
        $guessBtn.on('click', $guessBtnOnClick);
        gameObject.init();
    });
}(jQuery));
