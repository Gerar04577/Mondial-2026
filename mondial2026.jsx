import { useState } from "react";

// ── DONNEES EN TEMPS REEL (mis a jour le 24/06/2026 17:00 CEST) ──
const LAST_UPDATE = "24/06/2026 17:00";

const GAMES = [
  {id:1,status:"final",start:"2026-06-21T22:00:00Z",home:"URU",away:"CPV",group:"H",score:{URU:2,CPV:2}},
  {id:2,status:"final",start:"2026-06-22T01:00:00Z",home:"NZL",away:"EGY",group:"G",score:{NZL:1,EGY:3}},
  {id:3,status:"final",start:"2026-06-22T17:00:00Z",home:"ARG",away:"AUT",group:"J",score:{ARG:2,AUT:0}},
  {id:4,status:"final",start:"2026-06-22T21:00:00Z",home:"FRA",away:"IRQ",group:"I",score:{FRA:3,IRQ:0}},
  {id:5,status:"final",start:"2026-06-23T00:00:00Z",home:"NOR",away:"SEN",group:"I",score:{NOR:3,SEN:2}},
  {id:6,status:"final",start:"2026-06-23T03:00:00Z",home:"JOR",away:"DZA",group:"J",score:{JOR:1,DZA:2}},
  {id:7,status:"final",start:"2026-06-23T17:00:00Z",home:"POR",away:"UZB",group:"K",score:{POR:5,UZB:0}},
  {id:8,status:"final",start:"2026-06-23T20:00:00Z",home:"ENG",away:"GHA",group:"L",score:{ENG:0,GHA:0}},
  {id:9,status:"final",start:"2026-06-23T23:00:00Z",home:"PAN",away:"CRO",group:"L",score:{PAN:0,CRO:1}},
  {id:10,status:"final",start:"2026-06-24T02:00:00Z",home:"COL",away:"COD",group:"K",score:{COL:1,COD:0}},
  {id:11,status:"scheduled",start:"2026-06-24T19:00:00Z",home:"SUI",away:"CAN",group:"B",prob:{SUI:40.2,CAN:29,draw:30.8}},
  {id:12,status:"scheduled",start:"2026-06-24T19:00:00Z",home:"BIH",away:"QAT",group:"B",prob:{BIH:71.7,QAT:11.3,draw:17}},
  {id:13,status:"scheduled",start:"2026-06-24T22:00:00Z",home:"SCO",away:"BRA",group:"C",prob:{SCO:9.2,BRA:74.2,draw:16.6}},
  {id:14,status:"scheduled",start:"2026-06-24T22:00:00Z",home:"MAR",away:"HTI",group:"C",prob:{MAR:83.4,HTI:5,draw:11.6}},
  {id:15,status:"scheduled",start:"2026-06-25T01:00:00Z",home:"CZE",away:"MEX",group:"A",prob:{CZE:25.6,MEX:49.2,draw:25.2}},
  {id:16,status:"scheduled",start:"2026-06-25T01:00:00Z",home:"RSA",away:"KOR",group:"A",prob:{RSA:16,KOR:60.6,draw:23.4}},
  {id:17,status:"scheduled",start:"2026-06-25T20:00:00Z",home:"ECU",away:"GER",group:"E",prob:{ECU:24.3,GER:52.2,draw:23.5}},
  {id:18,status:"scheduled",start:"2026-06-25T20:00:00Z",home:"CUW",away:"CIV",group:"E",prob:{CUW:4.8,CIV:84.7,draw:10.5}},
  {id:19,status:"scheduled",start:"2026-06-25T23:00:00Z",home:"TUN",away:"NED",group:"F",prob:{TUN:3.2,NED:88.1,draw:8.7}},
  {id:20,status:"scheduled",start:"2026-06-25T23:00:00Z",home:"JPN",away:"SWE",group:"F",prob:{JPN:50.9,SWE:22.4,draw:26.7}},
];

const STANDINGS = [
  {g:"A",r:1,a:"MEX",n:"Mexique",    j:2,v:2,nul:0,d:0,pts:6},
  {g:"A",r:2,a:"KOR",n:"Coree S.",   j:2,v:1,nul:0,d:1,pts:3},
  {g:"A",r:3,a:"CZE",n:"Tcheque",    j:2,v:0,nul:1,d:1,pts:1},
  {g:"A",r:4,a:"RSA",n:"Afr. Sud",   j:2,v:0,nul:1,d:1,pts:1},
  {g:"B",r:1,a:"CAN",n:"Canada",     j:2,v:1,nul:1,d:0,pts:4},
  {g:"B",r:2,a:"SUI",n:"Suisse",     j:2,v:1,nul:1,d:0,pts:4},
  {g:"B",r:3,a:"BIH",n:"Bosnie",     j:2,v:0,nul:1,d:1,pts:1},
  {g:"B",r:4,a:"QAT",n:"Qatar",      j:2,v:0,nul:1,d:1,pts:1},
  {g:"C",r:1,a:"BRA",n:"Bresil",     j:2,v:1,nul:1,d:0,pts:4},
  {g:"C",r:2,a:"MAR",n:"Maroc",      j:2,v:1,nul:1,d:0,pts:4},
  {g:"C",r:3,a:"SCO",n:"Ecosse",     j:2,v:1,nul:0,d:1,pts:3},
  {g:"C",r:4,a:"HTI",n:"Haiti",      j:2,v:0,nul:0,d:2,pts:0},
  {g:"D",r:1,a:"USA",n:"Etats-Unis", j:2,v:2,nul:0,d:0,pts:6},
  {g:"D",r:2,a:"AUS",n:"Australie",  j:2,v:1,nul:0,d:1,pts:3},
  {g:"D",r:3,a:"PAR",n:"Paraguay",   j:2,v:1,nul:0,d:1,pts:3},
  {g:"D",r:4,a:"TUR",n:"Turquie",    j:2,v:0,nul:0,d:2,pts:0},
  {g:"E",r:1,a:"GER",n:"Allemagne",  j:2,v:2,nul:0,d:0,pts:6},
  {g:"E",r:2,a:"CIV",n:"Cote Ivoire",j:2,v:1,nul:0,d:1,pts:3},
  {g:"E",r:3,a:"ECU",n:"Equateur",   j:2,v:0,nul:1,d:1,pts:1},
  {g:"E",r:4,a:"CUW",n:"Curacao",    j:2,v:0,nul:1,d:1,pts:1},
  {g:"F",r:1,a:"NED",n:"Pays-Bas",   j:2,v:1,nul:1,d:0,pts:4},
  {g:"F",r:2,a:"JPN",n:"Japon",      j:2,v:1,nul:1,d:0,pts:4},
  {g:"F",r:3,a:"SWE",n:"Suede",      j:2,v:1,nul:0,d:1,pts:3},
  {g:"F",r:4,a:"TUN",n:"Tunisie",    j:2,v:0,nul:0,d:2,pts:0},
  {g:"G",r:1,a:"EGY",n:"Egypte",     j:2,v:1,nul:1,d:0,pts:4},
  {g:"G",r:2,a:"IRN",n:"Iran",       j:2,v:0,nul:2,d:0,pts:2},
  {g:"G",r:3,a:"BEL",n:"Belgique",   j:2,v:0,nul:2,d:0,pts:2},
  {g:"G",r:4,a:"NZL",n:"N-Zelande",  j:2,v:0,nul:1,d:1,pts:1},
  {g:"H",r:1,a:"ESP",n:"Espagne",    j:2,v:1,nul:1,d:0,pts:4},
  {g:"H",r:2,a:"URU",n:"Uruguay",    j:2,v:0,nul:2,d:0,pts:2},
  {g:"H",r:3,a:"CPV",n:"Cap-Vert",   j:2,v:0,nul:2,d:0,pts:2},
  {g:"H",r:4,a:"KSA",n:"Arabie Sao.",j:2,v:0,nul:1,d:1,pts:1},
  {g:"I",r:1,a:"FRA",n:"France",     j:2,v:2,nul:0,d:0,pts:6},
  {g:"I",r:2,a:"NOR",n:"Norvege",    j:2,v:2,nul:0,d:0,pts:6},
  {g:"I",r:3,a:"SEN",n:"Senegal",    j:2,v:0,nul:0,d:2,pts:0},
  {g:"I",r:4,a:"IRQ",n:"Iraq",       j:2,v:0,nul:0,d:2,pts:0},
  {g:"J",r:1,a:"ARG",n:"Argentine",  j:2,v:2,nul:0,d:0,pts:6},
  {g:"J",r:2,a:"AUT",n:"Autriche",   j:2,v:1,nul:0,d:1,pts:3},
  {g:"J",r:3,a:"DZA",n:"Algerie",    j:2,v:1,nul:0,d:1,pts:3},
  {g:"J",r:4,a:"JOR",n:"Jordanie",   j:2,v:0,nul:0,d:2,pts:0},
  {g:"K",r:1,a:"COL",n:"Colombie",   j:2,v:2,nul:0,d:0,pts:6},
  {g:"K",r:2,a:"POR",n:"Portugal",   j:2,v:1,nul:1,d:0,pts:4},
  {g:"K",r:3,a:"COD",n:"Congo RD",   j:2,v:0,nul:1,d:1,pts:1},
  {g:"K",r:4,a:"UZB",n:"Ouzbekistan",j:2,v:0,nul:0,d:2,pts:0},
  {g:"L",r:1,a:"ENG",n:"Angleterre", j:2,v:1,nul:1,d:0,pts:4},
  {g:"L",r:2,a:"GHA",n:"Ghana",      j:2,v:1,nul:1,d:0,pts:4},
  {g:"L",r:3,a:"CRO",n:"Croatie",    j:2,v:1,nul:0,d:1,pts:3},
  {g:"L",r:4,a:"PAN",n:"Panama",     j:2,v:0,nul:0,d:2,pts:0},
];

const FLAGS = {
  MEX:"🇲🇽",KOR:"🇰🇷",CZE:"🇨🇿",RSA:"🇿🇦",CAN:"🇨🇦",SUI:"🇨🇭",BIH:"🇧🇦",QAT:"🇶🇦",
  BRA:"🇧🇷",MAR:"🇲🇦",SCO:"🏴󠁧󠁢󠁳󠁣󠁴󠁿",HTI:"🇭🇹",USA:"🇺🇸",AUS:"🇦🇺",PAR:"🇵🇾",TUR:"🇹🇷",
  GER:"🇩🇪",CIV:"🇨🇮",ECU:"🇪🇨",CUW:"🇨🇼",NED:"🇳🇱",JPN:"🇯🇵",SWE:"🇸🇪",TUN:"🇹🇳",
  EGY:"🇪🇬",IRN:"🇮🇷",BEL:"🇧🇪",NZL:"🇳🇿",ESP:"🇪🇸",URU:"🇺🇾",CPV:"🇨🇻",KSA:"🇸🇦",
  FRA:"🇫🇷",NOR:"🇳🇴",SEN:"🇸🇳",IRQ:"🇮🇶",ARG:"🇦🇷",AUT:"🇦🇹",DZA:"🇩🇿",JOR:"🇯🇴",
  COL:"🇨🇴",POR:"🇵🇹",COD:"🇨🇩",UZB:"🇺🇿",ENG:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",GHA:"🇬🇭",CRO:"🇭🇷",PAN:"🇵🇦"
};

const G = {pitch:"#0a3d1f",gold:"#e8b84b",white:"#f5f5f0",grey:"#a8a89e",card:"#0f1a0f",card2:"#141f14",red:"#e84b4b",green:"#4be87a",bel:"#ed2939"};

const fh = (iso) => { try { return new Date(iso).toLocaleTimeString("fr-BE",{hour:"2-digit",minute:"2-digit",timeZone:"Europe/Brussels"}); } catch(e){return "";} };
const fd = (iso) => { try { return new Date(iso).toLocaleDateString("fr-BE",{day:"2-digit",month:"2-digit",timeZone:"Europe/Brussels"}); } catch(e){return "";} };
const fdl = (iso) => { try { return new Date(iso).toLocaleDateString("fr-BE",{weekday:"long",day:"numeric",month:"long",timeZone:"Europe/Brussels"}); } catch(e){return "";} };

// ── COMPOSANTS ──────────────────────────────────────────────

function Card({title, bel, children}) {
  return (
    <div style={{background:G.card,border:"1px solid "+(bel?"rgba(237,41,57,0.5)":"rgba(232,184,75,0.15)"),borderRadius:10,marginBottom:12,overflow:"hidden"}}>
      {title && <div style={{background:G.card2,padding:"7px 14px",fontFamily:"Bebas Neue,sans-serif",fontSize:"1rem",letterSpacing:2,color:bel?G.bel:G.gold,borderBottom:"1px solid rgba(232,184,75,0.12)"}}>{title}</div>}
      {children}
    </div>
  );
}

function MatchRow({game}) {
  const done = game.status === "final";
  const hasBel = game.home === "BEL" || game.away === "BEL";
  const hs = done ? game.score[game.home] : null;
  const as = done ? game.score[game.away] : null;
  const hW = done && hs > as;
  const aW = done && as > hs;
  return (
    <div style={{display:"flex",alignItems:"center",padding:"10px 14px",borderBottom:"1px solid rgba(255,255,255,0.05)",background:hasBel?"rgba(237,41,57,0.05)":"transparent",borderLeft:hasBel?"3px solid #ed2939":"3px solid transparent"}}>
      <span style={{flex:1,fontWeight:hW?700:500,fontSize:"0.85rem",opacity:aW?0.5:1}}>{FLAGS[game.home]||"🏳"} {game.home}</span>
      <div style={{minWidth:76,textAlign:"center"}}>
        {done
          ? <span style={{fontFamily:"Bebas Neue,sans-serif",fontSize:"1.3rem",color:G.gold,letterSpacing:2}}>{hs} - {as}</span>
          : <span style={{color:G.grey,fontSize:"0.7rem",fontWeight:600}}>VS</span>}
      </div>
      <span style={{flex:1,textAlign:"right",fontWeight:aW?700:500,fontSize:"0.85rem",opacity:hW?0.5:1}}>{game.away} {FLAGS[game.away]||"🏳"}</span>
      <div style={{minWidth:72,textAlign:"right",marginLeft:8}}>
        <div style={{fontSize:"0.6rem",color:G.grey}}>Grp {game.group} · {fd(game.start)}</div>
        <div style={{fontSize:"0.82rem",fontWeight:600,color:G.white}}>{fh(game.start)}</div>
      </div>
    </div>
  );
}

function StandingsTable({teams}) {
  return (
    <table style={{width:"100%",borderCollapse:"collapse",fontSize:"0.82rem"}}>
      <thead>
        <tr style={{background:G.card2,color:G.grey,fontSize:"0.6rem",textTransform:"uppercase"}}>
          <th style={{padding:"6px 10px",textAlign:"left"}}>Equipe</th>
          <th style={{padding:"6px 4px",textAlign:"center"}}>J</th>
          <th style={{padding:"6px 4px",textAlign:"center",color:G.green}}>V</th>
          <th style={{padding:"6px 4px",textAlign:"center"}}>N</th>
          <th style={{padding:"6px 4px",textAlign:"center",color:G.red}}>D</th>
          <th style={{padding:"6px 4px",textAlign:"center",color:G.gold}}>Pts</th>
        </tr>
      </thead>
      <tbody>
        {teams.map((t,i) => {
          const isBel = t.a === "BEL";
          const bb = t.r===1?G.gold:t.r===2?"rgba(232,184,75,0.3)":"rgba(255,255,255,0.1)";
          const bc = t.r===1?"#000":G.gold;
          return (
            <tr key={i} style={{borderBottom:"1px solid rgba(255,255,255,0.05)",background:isBel?"rgba(237,41,57,0.08)":"transparent"}}>
              <td style={{padding:"8px 10px",fontWeight:600,color:isBel?G.bel:G.white}}>
                <span style={{display:"inline-flex",width:18,height:18,alignItems:"center",justifyContent:"center",borderRadius:"50%",fontSize:"0.62rem",fontWeight:700,marginRight:6,background:bb,color:bc}}>{t.r}</span>
                {FLAGS[t.a]||""} {t.n}
              </td>
              <td style={{textAlign:"center",padding:"8px 4px"}}>{t.j}</td>
              <td style={{textAlign:"center",padding:"8px 4px",color:G.green}}>{t.v}</td>
              <td style={{textAlign:"center",padding:"8px 4px"}}>{t.nul}</td>
              <td style={{textAlign:"center",padding:"8px 4px",color:G.red}}>{t.d}</td>
              <td style={{textAlign:"center",padding:"8px 4px",color:G.gold,fontWeight:700,fontSize:"0.95rem"}}>{t.pts}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

// ── ONGLETS ─────────────────────────────────────────────────

function Accueil() {
  const finished = [...GAMES].filter(g=>g.status==="final").sort((a,b)=>new Date(b.start)-new Date(a.start)).slice(0,6);
  const upcoming = GAMES.filter(g=>g.status==="scheduled").slice(0,5);
  const belG = STANDINGS.filter(t=>t.g==="G");
  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,margin:"14px 0"}}>
        {[{n:GAMES.filter(g=>g.status==="final").length,l:"Joues"},{n:12,l:"Groupes"},{n:48,l:"Nations"},{n:"🇧🇪",l:"Grp G",e:true}].map((s,i)=>(
          <div key={i} style={{background:G.card,border:"1px solid rgba(232,184,75,0.15)",borderRadius:10,padding:"10px 6px",textAlign:"center"}}>
            <div style={{fontFamily:s.e?"Inter":"Bebas Neue,sans-serif",fontSize:s.e?"1.6rem":"1.9rem",color:G.gold,lineHeight:1}}>{s.n}</div>
            <div style={{fontSize:"0.58rem",color:G.grey,textTransform:"uppercase",letterSpacing:1,marginTop:3}}>{s.l}</div>
          </div>
        ))}
      </div>
      <Card title="🇧🇪 Belgique — Groupe G" bel><StandingsTable teams={belG}/></Card>
      <Card title="Derniers resultats">{finished.map((g,i)=><MatchRow key={i} game={g}/>)}</Card>
      <Card title="Prochains matchs">{upcoming.map((g,i)=><MatchRow key={i} game={g}/>)}</Card>
    </div>
  );
}

function Resultats() {
  const finished = [...GAMES].filter(g=>g.status==="final").sort((a,b)=>new Date(b.start)-new Date(a.start));
  const byDate = {};
  finished.forEach(g=>{const d=fdl(g.start);if(!byDate[d])byDate[d]=[];byDate[d].push(g);});
  return (
    <div>
      {Object.entries(byDate).map(([date,gs])=>(
        <div key={date}>
          <div style={{fontFamily:"Bebas Neue,sans-serif",fontSize:"0.95rem",letterSpacing:3,color:G.grey,padding:"14px 0 6px",textTransform:"uppercase"}}>{date}</div>
          <Card>{gs.map((g,i)=><MatchRow key={i} game={g}/>)}</Card>
        </div>
      ))}
    </div>
  );
}

function Groupes() {
  const [active,setActive] = useState("ALL");
  const groups = [...new Set(STANDINGS.map(t=>t.g))].sort();
  const shown = active==="ALL" ? groups : [active];
  return (
    <div>
      <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:14,marginTop:4}}>
        {["ALL",...groups].map(g=>(
          <button key={g} onClick={()=>setActive(g)} style={{padding:"4px 11px",borderRadius:20,cursor:"pointer",border:"1px solid rgba(232,184,75,0.3)",fontWeight:600,fontSize:"0.7rem",background:active===g?G.gold:"transparent",color:active===g?"#000":G.grey}}>
            {g==="ALL"?"Tous":"Grp "+g}
          </button>
        ))}
      </div>
      {shown.map(g=>(
        <Card key={g} title={"Groupe "+g}>
          <StandingsTable teams={STANDINGS.filter(t=>t.g===g)}/>
        </Card>
      ))}
    </div>
  );
}

function Avenir() {
  const upcoming = [...GAMES].filter(g=>g.status==="scheduled").sort((a,b)=>new Date(a.start)-new Date(b.start));
  const byDate = {};
  upcoming.forEach(g=>{const d=fdl(g.start);if(!byDate[d])byDate[d]=[];byDate[d].push(g);});
  return (
    <div>
      {Object.entries(byDate).map(([date,gs])=>(
        <div key={date}>
          <div style={{fontFamily:"Bebas Neue,sans-serif",fontSize:"0.95rem",letterSpacing:3,color:G.grey,padding:"14px 0 6px",textTransform:"uppercase"}}>{date}</div>
          <Card>
            {gs.map((g,i)=>{
              const p = g.prob;
              return (
                <div key={i} style={{padding:"11px 14px",borderBottom:"1px solid rgba(255,255,255,0.05)"}}>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <div style={{flex:1}}>
                      <div style={{fontWeight:600,fontSize:"0.85rem"}}>{FLAGS[g.home]||"🏳"} {g.home}</div>
                      {p && <div style={{height:3,background:"rgba(255,255,255,0.1)",borderRadius:2,marginTop:4,overflow:"hidden"}}><div style={{width:(p[g.home]||0)+"%",height:"100%",background:G.gold}}/></div>}
                      {p && <div style={{fontSize:"0.62rem",color:G.grey,marginTop:2}}>{p[g.home]}%</div>}
                    </div>
                    <div style={{textAlign:"center",minWidth:64}}>
                      <div style={{fontSize:"0.58rem",color:G.grey}}>GRP {g.group}</div>
                      <div style={{fontWeight:700,color:G.white,fontSize:"0.88rem"}}>{fh(g.start)}</div>
                      <div style={{fontSize:"0.6rem",color:G.grey}}>{fd(g.start)}</div>
                    </div>
                    <div style={{flex:1,textAlign:"right"}}>
                      <div style={{fontWeight:600,fontSize:"0.85rem"}}>{g.away} {FLAGS[g.away]||"🏳"}</div>
                      {p && <div style={{height:3,background:"rgba(255,255,255,0.1)",borderRadius:2,marginTop:4,overflow:"hidden",direction:"rtl"}}><div style={{width:(p[g.away]||0)+"%",height:"100%",background:G.gold}}/></div>}
                      {p && <div style={{fontSize:"0.62rem",color:G.grey,marginTop:2,textAlign:"right"}}>{p[g.away]}%</div>}
                    </div>
                  </div>
                </div>
              );
            })}
          </Card>
        </div>
      ))}
    </div>
  );
}

function Tableau() {
  const sep = (title,dates) => (
    <div>
      <div style={{display:"flex",alignItems:"center",gap:10,padding:"16px 0 5px"}}>
        <div style={{flex:1,height:1,background:"rgba(232,184,75,0.2)"}}/>
        <span style={{fontFamily:"Bebas Neue,sans-serif",fontSize:"1rem",letterSpacing:3,color:G.gold}}>{title}</span>
        <div style={{flex:1,height:1,background:"rgba(232,184,75,0.2)"}}/>
      </div>
      <div style={{fontSize:"0.63rem",color:G.grey,textAlign:"center",letterSpacing:1,marginBottom:10}}>{dates}</div>
    </div>
  );
  const tbd = (id,d,a,b) => (
    <div key={id} style={{background:G.card,border:"1px dashed rgba(232,184,75,0.2)",borderRadius:8,overflow:"hidden",opacity:0.75}}>
      <div style={{background:G.card2,padding:"3px 10px",fontSize:"0.58rem",color:G.grey,display:"flex",justifyContent:"space-between"}}><span>{id}</span><span>{d}</span></div>
      <div style={{padding:"7px 10px",fontSize:"0.76rem",color:G.grey,fontStyle:"italic"}}>{a}</div>
      <div style={{padding:"7px 10px",fontSize:"0.76rem",color:G.grey,fontStyle:"italic",borderTop:"1px solid rgba(255,255,255,0.04)"}}>{b}</div>
    </div>
  );
  const g2 = {display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:8,marginBottom:4};

  return (
    <div>
      <div style={{background:"rgba(232,184,75,0.08)",border:"1px solid rgba(232,184,75,0.2)",borderRadius:8,padding:"9px 14px",margin:"14px 0",fontSize:"0.76rem",color:G.grey,textAlign:"center"}}>
        Phase de groupes en cours — qualifies connus vers le 2 juillet 2026
      </div>

      {sep("16es DE FINALE","3 — 9 juillet 2026")}
      <div style={g2}>
        {tbd("M49","3 juil.","1er Grp A","2e Grp B")}
        {tbd("M50","3 juil.","1er Grp C","2e Grp D")}
        {tbd("M51","4 juil.","1er Grp B","2e Grp A")}
        {tbd("M52","4 juil.","1er Grp D","2e Grp C")}
        {tbd("M53","5 juil.","1er Grp E","2e Grp F")}
        {tbd("M54","5 juil.","1er Grp G","2e Grp H")}
        {tbd("M55","6 juil.","1er Grp F","2e Grp E")}
        {tbd("M56","6 juil.","1er Grp H","2e Grp G")}
        {tbd("M57","7 juil.","1er Grp I","2e Grp J")}
        {tbd("M58","7 juil.","1er Grp K","2e Grp L")}
        {tbd("M59","7 juil.","1er Grp J","2e Grp I")}
        {tbd("M60","7 juil.","1er Grp L","2e Grp K")}
        {tbd("M61","8 juil.","Meilleur 3e","Meilleur 3e")}
        {tbd("M62","8 juil.","Meilleur 3e","Meilleur 3e")}
        {tbd("M63","9 juil.","Meilleur 3e","Meilleur 3e")}
        {tbd("M64","9 juil.","Meilleur 3e","Meilleur 3e")}
      </div>

      {sep("8es DE FINALE","11 — 14 juillet 2026")}
      <div style={g2}>
        {tbd("QF1","11 juil.","Vainqueur M49","Vainqueur M50")}
        {tbd("QF2","11 juil.","Vainqueur M51","Vainqueur M52")}
        {tbd("QF3","12 juil.","Vainqueur M53","Vainqueur M54")}
        {tbd("QF4","12 juil.","Vainqueur M55","Vainqueur M56")}
        {tbd("QF5","13 juil.","Vainqueur M57","Vainqueur M58")}
        {tbd("QF6","13 juil.","Vainqueur M59","Vainqueur M60")}
        {tbd("QF7","14 juil.","Vainqueur M61","Vainqueur M62")}
        {tbd("QF8","14 juil.","Vainqueur M63","Vainqueur M64")}
      </div>

      {sep("QUARTS DE FINALE","17 — 19 juillet 2026")}
      <div style={g2}>
        {tbd("1/4 A","17 juil.","Vainqueur QF1","Vainqueur QF2")}
        {tbd("1/4 B","18 juil.","Vainqueur QF3","Vainqueur QF4")}
        {tbd("1/4 C","18 juil.","Vainqueur QF5","Vainqueur QF6")}
        {tbd("1/4 D","19 juil.","Vainqueur QF7","Vainqueur QF8")}
      </div>

      {sep("DEMI-FINALES","22 — 23 juillet 2026")}
      <div style={g2}>
        {tbd("1/2 A","22 juil.","Vainqueur 1/4 A","Vainqueur 1/4 B")}
        {tbd("1/2 B","23 juil.","Vainqueur 1/4 C","Vainqueur 1/4 D")}
      </div>

      {sep("PETITE FINALE","25 juillet 2026 — Miami")}
      <div style={{maxWidth:380,margin:"0 auto 6px"}}>
        {tbd("3e place","25 juil.","Perdant 1/2 A","Perdant 1/2 B")}
      </div>

      <div style={{display:"flex",alignItems:"center",gap:10,padding:"18px 0 6px"}}>
        <div style={{flex:1,height:1,background:"rgba(232,184,75,0.4)"}}/>
        <span style={{fontFamily:"Bebas Neue,sans-serif",fontSize:"1.4rem",letterSpacing:3,color:"#fff"}}>FINALE</span>
        <div style={{flex:1,height:1,background:"rgba(232,184,75,0.4)"}}/>
      </div>
      <div style={{fontSize:"0.67rem",color:G.grey,textAlign:"center",letterSpacing:1,marginBottom:10}}>
        19 JUILLET 2026 · METLIFE STADIUM NEW YORK · 19h CEST
      </div>
      <div style={{maxWidth:380,margin:"0 auto 8px",background:G.card,border:"2px solid rgba(232,184,75,0.5)",borderRadius:8,overflow:"hidden"}}>
        <div style={{background:"rgba(232,184,75,0.15)",padding:"4px 10px",fontSize:"0.6rem",color:G.gold,letterSpacing:1,display:"flex",justifyContent:"space-between"}}>
          <span>FINALE MONDIALE</span><span>19 juil. 19h</span>
        </div>
        <div style={{padding:"14px 12px",fontSize:"0.9rem",color:G.grey,fontStyle:"italic",borderBottom:"1px solid rgba(255,255,255,0.05)"}}>Vainqueur 1/2 A</div>
        <div style={{padding:"14px 12px",fontSize:"0.9rem",color:G.grey,fontStyle:"italic"}}>Vainqueur 1/2 B</div>
      </div>
      <div style={{textAlign:"center",fontSize:"3rem",padding:20}}>🏆</div>
    </div>
  );
}

// ── APP ─────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState("accueil");

  const tabs = [
    {id:"accueil", label:"🏠 Accueil"},
    {id:"resultats", label:"Resultats"},
    {id:"groupes", label:"Groupes"},
    {id:"avenir", label:"A venir"},
    {id:"tableau", label:"Tableau"},
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{__html:`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0a3d1f; color: #f5f5f0; font-family: Inter, sans-serif; }
      `}}/>
      <div style={{minHeight:"100vh",background:G.pitch}}>

        {/* HEADER */}
        <div style={{background:"linear-gradient(135deg,#000 0%,#0a3d1f 60%,#0d5229 100%)",borderBottom:"2px solid #e8b84b",position:"sticky",top:0,zIndex:100}}>
          <div style={{textAlign:"center",padding:"14px 12px 8px"}}>
            <div style={{fontFamily:"Bebas Neue,sans-serif",fontSize:"2.4rem",letterSpacing:4,color:"#e8b84b",lineHeight:1}}>
              Mondial 2026
            </div>
            <div style={{color:"#a8a89e",fontSize:"0.65rem",letterSpacing:2,textTransform:"uppercase",marginTop:2}}>
              USA · Canada · Mexique
            </div>
            <div style={{fontSize:"0.62rem",color:"#a8a89e",marginTop:4}}>
              Donnees mises a jour le {LAST_UPDATE} · Dites "mets a jour" pour rafraichir
            </div>
          </div>
          <div style={{display:"flex",overflowX:"auto",borderTop:"1px solid rgba(232,184,75,0.15)"}}>
            {tabs.map(t=>(
              <button key={t.id} onClick={()=>setTab(t.id)} style={{
                flex:"0 0 auto",padding:"9px 14px",border:"none",background:"transparent",
                color:tab===t.id?"#e8b84b":"#a8a89e",
                borderBottom:tab===t.id?"3px solid #e8b84b":"3px solid transparent",
                fontWeight:600,fontSize:"0.7rem",letterSpacing:1,textTransform:"uppercase",cursor:"pointer",whiteSpace:"nowrap"
              }}>{t.label}</button>
            ))}
          </div>
        </div>

        {/* CONTENT */}
        <div style={{maxWidth:700,margin:"0 auto",padding:"0 12px 50px"}}>
          {tab==="accueil"   && <Accueil/>}
          {tab==="resultats" && <Resultats/>}
          {tab==="groupes"   && <Groupes/>}
          {tab==="avenir"    && <Avenir/>}
          {tab==="tableau"   && <Tableau/>}
        </div>
      </div>
    </>
  );
}
