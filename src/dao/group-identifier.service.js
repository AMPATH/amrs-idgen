const connection = require('../connection/connection');
const _ = require('lodash');

async function getMaxGroupIdByLocation(locationUuid) {
    const query = 'SELECT max(cohort_id) as id from cohort t1 inner join location t2 using (location_id) where t2.uuid = "' + locationUuid + '"';
    return connection.executeQuery(query).then((results, err) => {
        if(err) {
            console.error(err);
            throw err;
        }
        if(_.isEmpty(results)) {
            return 1;
        } else {
            return results[0]['id'] + 1;
        }
    });
}

async function groupNumberExists(groupNumber) {
    const query = `SELECT * from cohort_attribute where value = '${groupNumber}'`;
    return connection.executeQuery(query).then((results, err) => {
        if(err) {
            console.log(err);
            throw(err);
        }
        if(_.isEmpty(results)) {
            return false;
        } else {
            return true;
        }
    });
}

module.exports = {
    getMaxGroupIdByLocation,
    groupNumberExists
};