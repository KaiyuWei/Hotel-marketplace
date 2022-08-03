import { useSelector } from "react-redux";
import {Card, Avatar} from 'antd';
import moment from 'moment';
import { FieldContext } from "rc-field-form";

const {Meta} = Card;

const ConnectNav = () => {
     const {auth} = useSelector((state) => ({...state}));
     const {user} = auth;
    return <div className ="d-flex justify-content-around">
        <Card>
            <Meta avatar={<Avatar>{user.name[0]}</Avatar>} 
                title={user.name} 
                description={`Joined ${moment(user.createdAt).fromNow()}`} 
            />
        </Card>
        {auth && 
        auth.user && 
        auth.user.stipe_seller &&
        auth.user.stipe_seller.changes_enabled && (
        <>
            <div>Pending balance</div>
            <div>Payout settings</div>
        </>
        )}
    </div>;
}

export default ConnectNav;
