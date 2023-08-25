export const mapConfig = {
  'web-map-id': 'f6de5f58ab844610b9379e0e249e50cd'
};
export const layerConfig = {
  title: 'hrrr_soil_20151023',
  variables: [
    { name: "soilw@dbll", description: "Annual number of days with a maximum temperature greater than 90 degrees F" },
    { name: "tsoilw@dbll", description: "Soil temperature [K] @ Depth below land surface" }
  ],
  dimensions: {
    scenario: {
      name: "StdZ",
      description: "Scenario",
      values: [{
        value: 0,
        name: "Lower emissions",
        description: "If we drastically reduce our use of fossil fuels, reducing global emissions of heat-trapping gases to zero by 2040."
      }, {
        value: 0.01,
        name: "Higher emissions",
        description: "If we continue increasing emissions of heat-trapping gases from fossil fuels through 2100."
      }]
    },
    period: {
      name: "StdTime",
      description: "Time Period",
      values: [{
        value: 1445569200000,
        name: "Historical",
        years: "1976-2005"
      }, {
        value: 1445572800000,
        name: "Early Century",
        years: "2015-2044"
      }, {
        value: 1445576400000,
        name: "Mid Century",
        years: "2035-2064"
      }, {
        value: 1445580000000,
        name: "Late Century",
        years: "2070-2099"
      }]
    }
  },

};

export const portalUrl = 'https://geoxc.maps.arcgis.com';

export const applicationTitle = 'Climate assessment tool';

export const displayInfoModalDefault = false;
