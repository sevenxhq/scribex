// const Proskomma = require("proskomma-core")/
// import {Proskomma} from 'proskomma-core'
import { useProskomma } from "proskomma-react-hooks";


export const usfm2perf = (usfm) => {

  const { proskomma :pk , stateId, newStateId } = useProskomma({ verbose :false , unfoldingWord : false});
    let perf;
    try {
        // const pk = new Proskomma();
        console.log({pk})
        // pk.importDocuments(
        //     {lang: 'eng', abbr: 'tit'}, // doesn't matter...
        //     'usfm', 
        //     [usfm]
        // );
        const perfResultDocument = pk.gqlQuerySync(
            '{documents {id docSetId perf} }')
            .data.documents[0];
        console.log({perfResultDocument})
        perf = JSON.parse(perfResultDocument.perf);
    } catch (e) {
      console.log(e)
        perf = null
    }
    return perf;
}
