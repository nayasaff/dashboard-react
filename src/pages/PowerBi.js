import { useEffect, useState } from "react"
import { models } from "powerbi-client"
import { PowerBIEmbed } from "powerbi-client-react"
import axios from "axios"

const PowerBi = () => {
 


  return (
    <>
  
        <PowerBIEmbed
          embedConfig={{
            type: "report", // Supported types: report, dashboard, tile, visual, qna, paginated report and create
            id: process.env.REACT_REPORT_ID ,
            embedUrl: process.env.REACT_EMBEDED_URL,
            accessToken: process.env.REACT_ACCESS_TOKEN,
            tokenType: models.TokenType.Aad, // Use models.TokenType.Aad for SaaS embed
            settings: {
              panes: {
                filters: {
                  expanded: false,
                  visible: false,
                },
              },
              background: models.BackgroundType.Transparent,
            },
          }}
          eventHandlers={
            new Map([
              [
                "loaded",
                function () {
                  console.log("Report loaded")
                },
              ],
              [
                "rendered",
                function () {
                  console.log("Report rendered")
                },
              ],
              [
                "error",
                function (event) {
                  console.log(event.detail)
                },
              ],
              ["visualClicked", () => console.log("visual clicked")],
              ["pageChanged", (event) => console.log(event)],
            ])
          }
          cssClassName={"test"}
          getEmbeddedComponent={(embeddedReport) => {
            window.report = embeddedReport
          }}
        />

    </>
  )
}
export default PowerBi
