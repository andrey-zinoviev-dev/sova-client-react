import React from "react";


export default function AddModule() {
  const [moduleFormOpened, setModuleFormOpened] = React.useState(false);
  const [modulesAdded, setModulesAdded] = React.useState([]);


  return (
    <div style={{width: "100%", height: "100%", overflow: "auto"}}>
      <div style={{ padding: "0 45px 30px", display: "flex", justifyContent: "space-between", alignItems: "center", margin: "0 0 40px 0", borderBottom: "2px solid white"}}>
        <div style={{textAlign: "left"}}>
          <h2 style={{margin: "0 0 25px 0"}}>
            Добавление модулей и уроков к курсу
          </h2>
          <p style={{margin: 0}}>Добавьте модули к курсу, а потом добавьте уроки к ним. Так получится наполнить курс контентом</p>     
        </div>
        <button type="button" onClick={() => {
          setModuleFormOpened(true);
        }} style={{padding: "10px 15px", boxSizing:"border-box", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, fontWeight: 700, color: "white", backgroundColor: "rgb(226, 100, 59)"}}>
          <svg style={{display: "block", width: 20, height: 20, border: "2px solid white", borderRadius: "51%", fill: "white"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path style={{scale: "0.75", translate: "15% 15%"}} d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
          <span>
            Добавить модули
          </span>
        </button>
      </div>
      <ul style={{margin: 0, padding: 0, listStyle: "none", lineHeight: 2.5}}>
        {modulesAdded.length < 1 ? <li style={{fontSize: 18}}>Модули не добавлены</li> : modulesAdded.map((module, index) => {
          return <li key={index}>
            Модуль
          </li>
        }) }
      </ul>

      {moduleFormOpened && <div style={{display: "flex", flexDirection:"column", alignItems: "center", justifyContent: "center", position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgb(0 0 0/75%)"}}>
        <h3>Форма для добавления модуля</h3>
        <div>
          <label>Название модуля</label>
          <input></input>
        </div>

      </div>}
    </div>
  )
}