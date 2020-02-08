class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token

  include Pundit
  after_action :verify_authorized, except: :index
  after_action :verify_policy_scoped, only: :index

  before_action :authenticate!
  before_action :authenticate

  helper_method :current_user
  helper_method :current_session

  def pundit_user
    current_session
  end

  def current_user
    current_session.user
  end
  
  def current_session
    warden.user(:session) || Session.new(user: nil)
  end
  
  def warden
    request.env['warden']
  end

  def authenticate!
    warden.authenticate!
  end

  def authenticate
    redirect_to new_session_path unless current_user
  end
end
