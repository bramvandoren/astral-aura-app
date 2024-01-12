import { useQuery } from "@apollo/client"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { GET_AANVRAGEN } from "../graphql/Queries";
import { Navigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { route, Routes } from '../core/routes';




const KandidatenOpdracht = ({accepted}) => {

  const { opdrachtId } = useParams();

  console.log(useParams())

  const {error, loading, data : aanvragenMediums} = useQuery(GET_AANVRAGEN, {
      variables: {
          id : opdrachtId
      }
  })

  useEffect(() => {
  }, [aanvragenMediums]) 

  return(
      <div className="kandidaten">
      <Link to={route(Routes.OpdrachtDetail, {id: opdrachtId})}>Terug</Link>
        <h2>Aanvragen ({aanvragenMediums.entry.aanvragen.length})</h2>
          {
            error && <p color="danger">{error.message}</p>
          }
          {
            loading && <p>Laden</p>
          }
          {
            aanvragenMediums && (
              aanvragenMediums.entry.aanvragen.map((medium) => (
                  <div className="card" key={medium.id}>
                      {console.log(medium)}
                      <p>{medium.gebruiker[0].name}</p>
                      <p>{medium.prijs}</p>
                      <button>Accepteer</button>
                  </div>
              ))
            ) 
          }
          {
              accepted && (
                  accepted.map((medium) => (
                      <li key={medium.id}>
                          Kandidaten accepted
                      </li>
                  ))
              )
          }
          
      </div>
  )
}

export default KandidatenOpdracht