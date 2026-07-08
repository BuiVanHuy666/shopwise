export const SocialAuth = () => {
	return (
			<ul className="btn-login list_none text-center">
				<li>
					<a href="/api/auth/facebook" className="btn btn-facebook">
						<i className="ion-social-facebook"></i> Facebook
					</a>
				</li>
				<li>
					<a href="/api/auth/google" className="btn btn-google">
						<i className="ion-social-google"></i> Google
					</a>
				</li>
			</ul>
	)
}