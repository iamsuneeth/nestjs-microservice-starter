import { Injectable } from '@nestjs/common';
import { HasAccessRequest } from './dto/hasAccess.request.dto';
import { ManagementClientProviduer } from '../../utils/managementClientProvider';
import { ContextProvider } from '@app/infra';
import { ISubject } from '@app/common/interfaces/subject';

@Injectable()
export class RoleService {
  constructor(private clientProvider: ManagementClientProviduer) {}
  async hasAccess({ serviceId }: HasAccessRequest) {
    const client = this.clientProvider.getClient();
    const subject = ContextProvider.get('subject') as ISubject;
    const user = await client.getUser(subject.info.accessToken);
    //get permissons from auth0 using access token
    //for each permission get list of services mapped to it
    // check if the requested service is there in the list
    return false;
  }
}
