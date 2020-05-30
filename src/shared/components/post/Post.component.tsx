import { IPost } from '@shared/types/post.interface';
import React from 'react';
import { View } from 'react-native';
import { Avatar, Button, Caption, Colors, Divider, IconButton, Paragraph, Subheading, Title } from 'react-native-paper';
import { PostStyles as styles } from './Post.styles';

export interface PostProps {
	post: IPost;
}

export const Post: React.FC<PostProps> = ({ post }) => {
	const onClick = () => {
		console.log('Clicked');
	};
	return <View style={ styles.root }>
		<View style={ styles.header }>
			<Avatar.Text size={ 48 } label="E" style={ styles.avatar } />
			<View style={ styles.userData }>
				<Title style={ styles.name }>Elizabeth</Title>
				<Subheading style={ styles.username }>@elizabeth</Subheading>
			</View>
			<IconButton icon="dots-vertical" color={Colors.grey600} size={24} onPress={onClick} />
		</View>
		<View style={ styles.content }>
			<Paragraph style={ styles.text }>{ post.content }</Paragraph>
			<Caption style={ styles.date }>{ post.date.toLocaleString() }</Caption>
		</View>
		<Divider />
		<View style={ styles.actions }>
			<Button
				icon="message-reply-text"
				onPress={ onClick }
				labelStyle={ styles.actionButtonLabel }
				contentStyle={ styles.actionButton }
				style={ styles.replyButton }
			>{ post.likes.length }</Button>
			<Button
				icon="star-circle"
				onPress={ onClick }
				labelStyle={ styles.actionButtonLabel }
				contentStyle={ styles.actionButton }
			>{ post.likes.length }</Button>
			<Button
				icon="share"
				onPress={ onClick }
				labelStyle={ styles.actionButtonLabel }
				contentStyle={ styles.actionButton }
			>{ post.likes.length }</Button>
			{/*<Button
			 icon="share-variant"
			 onPress={ onClick }
			 labelStyle={ styles.actionButtonLabel }
			 contentStyle={ styles.actionButton }
			 >{ '' }</Button>*/ }
		</View>
	</View>;
};
