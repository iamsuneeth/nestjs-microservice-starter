import { join } from 'path';
import { serviceConstants } from '@app/common';

const pathToProto = '../../proto/';

export const grpcServiceList = {
  [serviceConstants.user.package]: {
    name: serviceConstants.user.name,
    options: {
      package: serviceConstants.user.package,
      protoPath: join(
        __dirname,
        `${pathToProto}/${serviceConstants.user.package}.proto`,
      ),
    },
  },
};
