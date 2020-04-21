class ApplicationController < ActionController::Base
  include Credible::ControllerConcern

  before_action :render_application, if: proc { request.format.html? }

  def render_application
    render 'application/index'
  end
end
