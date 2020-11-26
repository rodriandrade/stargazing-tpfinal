import styled from 'styled-components'

export const Container = styled.div`
.input_row {position:relative;}
.input_row div{position: absolute;
    top: 19px;
    right: 22px;
    color:#ff0000;
}
margin-top:40px;
width:100%;

.error_message{padding:20px; color:#ff0000;font-size:14px;}

input,
select, 
textarea { border: none; width: 100%; min-height: 60px; line-height: 34px; border-bottom:1px solid #ddd; background: #fff; -webkit-appearance: none; -moz-appearance: none; appearance: none; padding-left: 12px; font-size: 17px; margin-bottom:10px; }
input[type='submit'] ,button { width: 100px;
    background-color: #192331;
    padding: 15px;
    border: none;
    margin-right:10px;
    border-radius:5px;
    color: white; }
select { background: url(images/arrow.png) no-repeat center right; }
input[type='radio'],
input[type='checkbox'] { border:0; height: auto !important; background: none; padding-left: 0; line-height: inherit; min-height: 0; }
input[type='radio']  { -webkit-appearance: radio; -moz-appearance: radio; appearance: radio;}
input[type='checkbox'] { -webkit-appearance: checkbox; -moz-appearance: checkbox; appearance: checkbox;}
label { font-size: 16px; }

`