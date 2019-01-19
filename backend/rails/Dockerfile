FROM ruby:2.3.0

RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs

RUN mkdir /skypi
WORKDIR /skypi

ADD Gemfile /skypi/Gemfile
ADD Gemfile.lock /skypi/Gemfile.lock

RUN bundle install

ADD . /skypi
