import  styled  from "styled-components";

const StyledContianer  =  styled.div`
  padding:10px;
  min-height: 70vh;
  width:50vw;
  background-color:rgba(255,255,255);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  border-radius:12px;
  margin:40px auto;
  padding:5px;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 25px 30% 50%;
 align-items: center;
  @media (max-width: 700px) {
    width:90vw;
    margin: 50px auto;
    height: 60vh;
}
  @media (max-width: 1024px) {
    width:80vw;
    margin: 50px auto;
    height: 60vh;
}

`
export const StyledFrom = styled.form`
  width: 100%;
  grid-row: 3; 
  display: flex;
  
  flex-direction: column;
  align-items: center;
  gap:20px;
  justify-content:flex-start;
`
export const StyledHeader = styled.h1`
 width: 100%;
 font-weight: 900;
 grid-row: 2; 
 color:rgb(242,101,84);
  text-align: center;


  font-size: 28px;
`
export const StyledLabel = styled.label`

font-size: small;
display: block;
width: 100%;
text-align: end;
border-bottom: 1px solid gray;
`

export const StyledInput =styled.input`
height: 50px;
padding-left: 5px;
box-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
border-radius: 5px;
width: 50%;

font-weight: 600;
background:rgba(255,255,255, 0.40);
&::placeholder{
    font-weight: 400;
    padding:5px;
    color:gray;
}
&:focus{
    outline: none;
}

@media (max-width: 500px) {
    width:90%;
}

`
export const StyledButton = styled.button`
width: 50%;
padding: 5px;
background:rgb(242,101,84);
height: 50px;
color:white;
font-weight: bold;
box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
transition: transform 0.1s ease;
@media (max-width: 500px) {
    width:90%;
    
}
&:active{
    transform: scale(0.95);
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}
`
export const StyledBox  = styled.div`
width: 50%;
height: 100%;
display: flex;
flex-direction: column;
margin:10px auto;
`
export const StyledTile = styled.div`
margin-top: 4px;
width: 100%;
height:40px;
background: rgba(0, 0, 0, 0.2);
display: flex;
flex-direction: column;
border-radius:5px;
`
export default StyledContianer