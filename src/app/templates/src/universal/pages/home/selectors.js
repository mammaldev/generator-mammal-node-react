import { createSelector } from 'reselect';

//
// Base selectors.
//

const homePageStateSelector = ( state ) => state.get('home');

//
// Exported "page" selectors.
//

export const homePageSelector = createSelector(

  homePageStateSelector,

  ( home ) => {

    return {
      home: home ? home.toJS() : null,
    };
  }
);
