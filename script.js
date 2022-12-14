'use strict';

let formula = []; //式を保存しておく配列
const showFormulaDiv = document.getElementById('formula'); //式を表示するエリア

//ここからボタンエリア
const b1 = document.getElementById('b1'); //ボタン1
b1.onclick = function(){
    formula.push(1);
    showFormula();
    limitFormula();
};
const b2 = document.getElementById('b2'); //ボタン2
b2.onclick = function(){
    formula.push(2);
    showFormula();
    limitFormula();
};
const b3 = document.getElementById('b3'); //ボタン3
b3.onclick = function(){
    formula.push(3);
    showFormula();
    limitFormula();
};
const b4 = document.getElementById('b4'); //ボタン4
b4.onclick = function(){
    formula.push(4);
    showFormula();
    limitFormula();
};
const b5 = document.getElementById('b5'); //ボタン5
b5.onclick = function(){
    formula.push(5);
    showFormula();
    limitFormula();
};
const b6 = document.getElementById('b6'); //ボタン6
b6.onclick = function(){
    formula.push(6);
    showFormula();
    limitFormula();
};
const b7 = document.getElementById('b7'); //ボタン7
b7.onclick = function(){
    formula.push(7);
    showFormula();
    limitFormula();
};
const b8 = document.getElementById('b8'); //ボタン8
b8.onclick = function(){
    formula.push(8);
    showFormula();
    limitFormula();
};
const b9 = document.getElementById('b9'); //ボタン9
b9.onclick = function(){
    formula.push(9);
    showFormula();
    limitFormula();
};
const b0 = document.getElementById('b0'); //ボタン0
b0.onclick = function(){
    formula.push(0);
    showFormula();
    limitFormula();
};
const b_parenthesesLeft = document.getElementById('b_parenthesesLeft'); //ボタン"("
b_parenthesesLeft.onclick = function(){
    formula.push("(");
    showFormula();
    limitFormula();
};
const b_parenthesesRight = document.getElementById('b_parenthesesRight'); //ボタン")"
b_parenthesesRight.onclick = function(){
    formula.push(")");
    showFormula();
    limitFormula();
};
const b_point = document.getElementById('point'); //小数点
b_point.onclick = function(){
    formula.push(".");
    showFormula();
    limitFormula();
};
const b_pai = document.getElementById('pai'); //π
b_pai.onclick = function(){
    formula.push("π");
    showFormula();
    limitFormula();
};
const b_e = document.getElementById('napier'); //e
b_e.onclick = function(){
    formula.push("e");
    showFormula();
    limitFormula();
};

const b_backSpace = document.getElementById('backSpace'); //バックスペース
b_backSpace.onclick = function(){
    formula.pop(); //配列要素の末尾を削除
    showFormula();
};
const b_allClear = document.getElementById('allClear'); //全消し
b_allClear.onclick = function(){
    formula.length = 0;
    showFormula();
};

const b_sum = document.getElementById('sum'); //足し算
b_sum.onclick = function(){
    formula.push("+");
    showFormula();
    limitFormula();
};
const b_diff = document.getElementById('diff'); //ひき算
b_diff.onclick = function(){
    formula.push("-");
    showFormula();
    limitFormula();
};
const b_mult = document.getElementById('mult'); //かけ算
b_mult.onclick = function(){
    formula.push("×");
    showFormula();
    limitFormula();
};
const b_divi = document.getElementById('divi'); //わり算
b_divi.onclick = function(){
    formula.push("÷");
    showFormula();
    limitFormula();
};
const b_exp = document.getElementById('exp'); //累乗
b_exp.onclick = function(){
    formula.push("^");
    showFormula();
    limitFormula();
};
const b_sqrt = document.getElementById('sqrt'); //二乗根
b_sqrt.onclick = function(){
    formula.push('√');
    formula.push("(");
    showFormula();
    limitFormula();
};
const b_cbrt = document.getElementById('cbrt'); //三乗根
b_cbrt.onclick = function(){
    formula.push('∛');
    formula.push("(");
    showFormula();
    limitFormula();
};

const b_sin = document.getElementById('sin'); //sin
b_sin.onclick = function(){
    formula.push('sin');
    formula.push("(");
    showFormula();
    limitFormula();
};
const b_cos = document.getElementById('cos'); //cos
b_cos.onclick = function(){
    formula.push('cos');
    formula.push("(");
    showFormula();
    limitFormula();
};
const b_tan = document.getElementById('tan'); //tan
b_tan.onclick = function(){
    formula.push('tan');
    formula.push("(");
    showFormula();
    limitFormula();
};
const b_ln = document.getElementById('ln'); //log_e
b_ln.onclick = function(){
    formula.push('ln');
    formula.push("(");
    showFormula();
    limitFormula();
};
const b_log10 = document.getElementById('log10'); //log10
b_log10.onclick = function(){
    formula.push('log10');
    formula.push("(");
    showFormula();
    limitFormula();
};

const b_equals = document.getElementById('equals'); //計算処理(=)
const roundButton = document.getElementsByName('roundButton');
b_equals.onclick = function(){
    let answer = calcFormula();
    showFormula();
    if(roundButton[0].checked){
        answer = roundOff(answer);
    }
    showFormulaDiv.append('= ' + comma(answer));
};
//以上がボタンエリア


/**
 * 式が保存された配列から式を表示する関数
 */
function showFormula(){
    showFormulaDiv.innerText = '';
    const pFormula = document.createElement('p'); 
    //配列から式を組み立てる
    let strFormula = "";
    for(let i=0; i<formula.length; i++){
        strFormula = strFormula + formula[i];
    }
    pFormula.innerText = strFormula; 
    showFormulaDiv.appendChild(pFormula); 
}
/**
 * 式が長くなりすぎるのを防止する関数
 */
function limitFormula(){
    if(formula.length >= 40){
        window.alert("式が長すぎます\nThe formula is too long.");
        formula.pop(); //1個消す
        showFormula();
    }
}

/**
 * 式が保存された配列から式を解析、計算する関数
 */
function calcFormula(){
    let operatorCount = 0; //演算子の数
    let nest = 0; //優先度
    let value = []; //式から抽出した数値を格納
    let operator = []; //式から抽出した演算子を格納
    let priority = []; //計算の優先度を格納

    /*解析処理*/
    let pointFrag = false; //小数点かどうか判定する(少数でない:false、少数である:true)
    let pointStep = 10; //小数点第何位かを記憶(第一位なら10、第二位なら100、...)
    value[0] = 0; //計算のために最初の要素を初期化
    let chr; //式からi番目の文字を記憶

    for(let i=0; i<formula.length; i++){
        chr = formula[i];
        if(0<=chr && chr<=9){ //数字なら
            if(pointFrag){ //少数の場合
                value[operatorCount] = value[operatorCount] + chr/pointStep;
                if(0<=formula[i+1] && formula[i+1]<=9){ //まだ少数が続く場合
                    pointStep *= 10;
                }
                else{ //続かない(少数終わり)
                    pointFrag = false;
                    pointStep = 10;
                }
            }
            else{ //整数の場合
                value[operatorCount] = 10*value[operatorCount] + chr;
            }
        }
        else if(chr=='π'){
            if(value[operatorCount] != 0){
                value[operatorCount] = value[operatorCount] * Math.PI;
            }
            else{
                value[operatorCount] = Math.PI;
            }
        }
        else if(chr=='e'){
            if(value[operatorCount] != 0){
                value[operatorCount] = value[operatorCount] * Math.exp(1);
            }
            else{
                value[operatorCount] = Math.exp(1);
            }
        }
        else if(chr=='+' || chr=='-' || chr=='×' || chr=='÷' || chr=='^'){ //演算子の場合
            operator[operatorCount] = chr;
            if(chr=='+' || chr=='-'){ //優先度設定
                priority[operatorCount] = nest+0.01;
            }
            else if(chr=='×' || chr=='÷'){
                priority[operatorCount] = nest+1;
            }
            else{
                priority[operatorCount] = nest+100;
            }
            operatorCount++;
            value[operatorCount] = 0;
        }
        else if(chr=='√'||chr=='∛'||chr=="sin"||chr=="cos"||chr=="tan"||chr=="ln"||chr=="log10"){ //関数系の場合
            operator[operatorCount] = chr;
            priority[operatorCount] = nest+10000;
            operatorCount++;
            value[operatorCount] = 0;
        }
        else if(chr=='('){
            nest+=1000000;
        }
        else if(chr==')'){
            nest-=1000000;
        }
        else if(chr=='.'){
            pointFrag = true;
        }
    }

    /*テストコード
    console.log(`解析`);
    console.log(`value:::${value[0]},${value[1]},${value[2]},${value[3]},${value[4]},${value[5]},${value[6]},${value[7]}`);
    console.log(`operator:${operator[0]},${operator[1]},${operator[2]},${operator[3]},${operator[4]},${operator[5]},${operator[6]},${operator[7]}`);        console.log(`priority:${priority[0]},${priority[1]},${priority[2]},${priority[3]},${priority[4]},${priority[5]},${priority[6]},${priority[7]}`);
    */    
   

    /*計算処理*/
    let ip; //現在の演算子配列の添字

    while(operatorCount>0){
        ip = 0;

        for(let i=1; i<operatorCount; i++){
            if(priority[ip] < priority[i]){
                ip = i;
            }
        }

        chr = operator[ip];
        switch(chr){
            case '+':
                value[ip] = value[ip] + value[ip+1];
                break;
            case '-':
                value[ip] = value[ip] - value[ip+1];
                break;
            case '×':
                value[ip] = value[ip] * value[ip+1];
                break;
            case '÷':
                value[ip] = value[ip] / value[ip+1];
                break;
            case '^':
                value[ip] = value[ip] ** value[ip+1];
                break;
            case '√':
                value[ip] = Math.sqrt(value[ip+1]);
                break;
            case '∛':
                value[ip] = Math.cbrt(value[ip+1]);
                break;
            case "sin":
                value[ip] = calcTriFunc("sin",value[ip+1]);
                break;
            case "cos":
                value[ip] = calcTriFunc("cos",value[ip+1]);
                break;
            case "tan":
                value[ip] = calcTriFunc("tan",value[ip+1]);
                break;
            case "ln":
                value[ip] = Math.log(value[ip+1]);
                break;
            case "log10":
                value[ip] = Math.log10(value[ip+1]);
                break;
        }
        
        for(let i=ip+1; i<=operatorCount; i++){
            value[i] = value[i+1];
            operator[i-1] = operator[i];
            priority[i-1] = priority[i];
        }
        operatorCount--;

        /*テストコード
        console.log(`計算`);
        console.log(`value:::${value[0]},${value[1]},${value[2]},${value[3]},${value[4]},${value[5]},${value[6]},${value[7]}`);
        console.log(`operator:${operator[0]},${operator[1]},${operator[2]},${operator[3]},${operator[4]},${operator[5]},${operator[6]},${operator[7]}`);
        console.log(`priority:${priority[0]},${priority[1]},${priority[2]},${priority[3]},${priority[4]},${priority[5]},${priority[6]},${priority[7]}`);
        */
    }
    //答えを返却
    return value[0];
}


/*
 *三角関数を計算する関数
 *
 *kindOfにsin,cos,tanを指定
 *angleに角度を指定
 */
let angleRadio = document.getElementsByName('angle');
angleRadio[0].checked = true;

function calcTriFunc(kindOf,angle){
    let result = 0;
    let radian = angle;
    if (angleRadio.item(1).checked){ //度数法ならばラジアンに直す
        radian = angle * Math.PI /180;
    }
    switch(kindOf){
        case "sin" :
            result = Math.sin(radian);
            break;
        case "cos" :
            result = Math.cos(radian);
            break;
        case "tan" :
            result = Math.tan(radian);
            break;
    }
    return result;
}

/*
 *正規表現で3桁ごとにコンマ区切りにする関数 
 */
function comma(num){
    let string = String(num).split('.');
    let result = String(string[0]).replace( /(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
    if(string.length > 1){ //小数部があるなら
        result += '.' + string[1];
    }
    return result;
}

/**
 * 結果を四捨五入する関数
 * 
 * roundで入力された桁数を読み取り
 * baseに重みを保存
 * 引数で与えられたvalueをbaseによって四捨五入する
 */
function roundOff(result){
    let round = document.getElementById('round');
    let base = 1;
    if(round.value.length != 0){
        base = 10 ** (round.value-1);
    }
    return Math.round(result * base)/base;
}
  