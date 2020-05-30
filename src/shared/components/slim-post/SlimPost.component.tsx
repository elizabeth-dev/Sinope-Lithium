import { IPost } from '@shared/types/post.interface';
import React from 'react';
import { TouchableHighlight, View } from 'react-native';
import { Avatar, Caption, Colors, IconButton, Paragraph, Subheading, Title } from 'react-native-paper';
import { SlimPostStyles as styles } from './SlimPost.styles';

export interface SlimPostProps {
	post: IPost;
}
const onClick = () => {
	console.log('Clicked');
};

export const SlimPost: React.FC<SlimPostProps> = ({ post }) => {
	return (
		<TouchableHighlight underlayColor={ Colors.grey200 } onPress={ onClick }>
			<View style={ styles.root }>
				<Avatar.Text style={ styles.avatar } size={ 48 } label="E" />
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
