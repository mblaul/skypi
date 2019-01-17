module Api 
  module V1
    class DevicesController < ApplicationController
      def index
        devices = Device.order('created_at DESC');
        render json: { status: 'SUCCESS', message: 'Loaded devices', data:devices }, status: :ok
      end

      def show
        device = Device.find(params[:id])
        render json: { status: 'SUCCESS', message: 'Loaded device', data:device }, status: :ok
      end

      def create
        device = Device.new(device_params)

        if device.save
          render json: { status: 'SUCCESS', message: 'Saved device', data:device }, status: :ok
        else
          render json: { status: 'ERROR', message: 'Device not saved', data:device.errors }, status: :unprocessable_entity
        end
      end

      def destroy
        device = Device.find(params[:id])
        device.destroy
        render json: { status: 'SUCCESS', message: 'Deleted device', data:device }, status: :ok
      end

      def update
         device = Device.find(params[:id])

        if device.update_attributes(device_params)
          render json: { status: 'SUCCESS', message: 'Updated device', data:device }, status: :ok
        else
          render json: { status: 'ERROR', message: 'Device not updated', data:device.errors }, status: :unprocessable_entity
        end
      
      end

      private

      def device_params
        params.permit(:name, :macaddress)
      end
    end    
  end
end