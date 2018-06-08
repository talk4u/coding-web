import * as Pages from './index'

import Gym from './Gym'
import Sign from './Sign'
import Private from './Private'
import PrivateRoute from './PrivateRoute'

describe('Export Page Components', () => {
    it('+++ import each component', () => {
        expect(Pages.Gym).toEqual(Gym)
        expect(Pages.Sign).toEqual(Sign)
        expect(Pages.PrivateRoute).toEqual(PrivateRoute)
        expect(Pages.Private).toEqual(Private)
    });
})