import { IProfile } from '../../../shared/types/profile.interface';

export const mockedProfiles: {[profileId: string]: IProfile} = {
	test: {
		id: 'test',
		created: new Date(),
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vestibulum posuere quam sodales egestas. Quisque rhoncus mi leo, id varius dolor porttitor quis.',
		name: 'Elizabeth',
		tag: 'Elizabeth',
	},
};
