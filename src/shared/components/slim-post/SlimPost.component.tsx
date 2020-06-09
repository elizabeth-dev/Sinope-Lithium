import { mockedPosts } from '@core/mocks/post/commonPosts.mock';
import { ProfileAvatar } from '@shared/components/profile-avatar/ProfileAvatar.component';
import { IPost } from '@shared/types/post.interface';
import React from 'react';
import { ToastAndroid, TouchableHighlight, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Caption, Colors, IconButton, Paragraph, Subheading, Title } from 'react-native-paper';
import { PostScreen } from '../../../views/post/screens/post/PostScreen.component';
import { SlimPostStyles as styles } from './SlimPost.styles';

export interface SlimPostProps {
	post: IPost;
	stackId: string;
}

const onClick = () => {
	ToastAndroid.show('Clicked!', ToastAndroid.SHORT);
};
export const SlimPost: React.FC<SlimPostProps> = ({ post, stackId }) => {
	const onPostClick = () => {
		Navigation.push(stackId, {
			component: {
				name: PostScreen.displayName as string,
				options: {
					topBar: {
						title: {
							text: 'Post',
						},
						subtitle: {
							text: '',
						},
					},
				},
				passProps: {
					post,
					replies: mockedPosts,
					stackId,
				},
			},
		});
	};

	return (
		<TouchableHighlight underlayColor={ Colors.grey200 } onPress={ onPostClick }>
			<View style={ styles.root }>
				<ProfileAvatar style={ styles.avatar } label="E" size={48} stackId={stackId} profileId="test" />
				<View style={ styles.body }>
					<View style={ styles.header }>
						<View style={ styles.userData }>
							<Title style={ styles.name }>Elizabeth</Title>
							<Subheading style={ styles.username }>@elizabeth</Subheading>
						</View>
						<IconButton icon="dots-vertical" color={ Colors.grey600 } size={ 24 } onPress={ onClick } />
					</View>
					<View style={ styles.content }>
						<Paragraph style={ styles.text }>{ post.content }</Paragraph>
						<Caption style={ styles.date }>{ post.date.toLocaleString() }</Caption>
					</View>
					<View style={ styles.actions }>
						<IconButton
							icon="message-reply-text"
							style={ [ styles.actionButton, styles.replyButton ] }
							onPress={ onClick }
							size={ 18 }
							color={ Colors.grey600 }
						/>
						<IconButton
							icon="star-circle"
							onPress={ onClick }
							size={ 18 }
							color={ Colors.grey600 }
							style={ styles.actionButton }
						/>
						<IconButton
							icon="share"
							onPress={ onClick }
							size={ 18 }
							color={ Colors.grey600 }
							style={ styles.actionButton }
						/>
					</View>
				</View>
			</View>
		</TouchableHighlight>
	);
};
