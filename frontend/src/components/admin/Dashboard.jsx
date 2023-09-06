import AppInfoBox from '../AppInfoBox';
import LatestUploads from '../LatestUploads';

const Dashboard = () => {
	return (
		<div className="grid grid-cols-3 gap-5 my-5">
			<AppInfoBox title="Total Uploads" subTitle="100" />
			<AppInfoBox title="Total Reviews" subTitle="100" />
			<AppInfoBox title="Total Users" subTitle="100" />

			<LatestUploads/>
		</div>
	);
};

export default Dashboard;
