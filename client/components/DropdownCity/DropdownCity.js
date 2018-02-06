import React from 'react'
import { Dropdown } from 'semantic-ui-react'

// import { stateOptions } from '../common'
let marginTop={
    marginTop:10
};

let stateOptions = [ { key: 'Los Angeles', value: 'Los Angeles', text: 'Los Angeles' }, { key: 'Chicago', value: 'Chicago', text: 'Chicago' }, { key: 'New Orleans', value: 'New Orleans', text: 'New Orleans' } ];

const DropdownCity = () => (
    <Dropdown placeholder='City'
              style={marginTop}
              search
              selection
              options={stateOptions} />
);

export default DropdownCity