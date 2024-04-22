import { FC, useEffect, useState} from 'react';
import { models } from 'powerbi-client';
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';
import { PowerBIEmbed } from 'powerbi-client-react';

const PowerBiPOC = () => {
  const [reportConfig, setReportConfig] = useState({
    type: 'report',
    embedUrl: undefined,
    accessToken: undefined,
    id: undefined,
    tokenType: models.TokenType.Embed,
    settings: {
      panes: {
        filters: {
          expanded: false,
          visible: true
        }
      },
      background: models.BackgroundType.Transparent,
    }
  });




  return (<>
    <div>
      <PowerBIEmbed
        embedConfig = {reportConfig}
        cssClassName = 'power-bi-report-class'
      />
    </div>
  </>)
}
export default PowerBiPOC;


