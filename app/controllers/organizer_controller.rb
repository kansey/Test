class OrganizerController < ApplicationController

  def global
    @data = []
    @subject_area = SubjectArea.all
    @subject_area.each do |area|
      subjects = []
      area.subject.each do |item|
        tasks = []
        item.task.each do |task|
          tasks.push({id: task.id, state: {title: task.title, description: task.description,
                                              link: task.link, value: task.value}})
        end
        subjects.push({id: item.id, state: item.data, tasks: tasks})
      end
      @data.push({id: area.id, state: area.data, subjects: subjects})
    end
  end

  def task_new
    task = Subject.find(params[:id]).task.new(title: params[:title], value: false)
    task.save
    respond_to do |format|
      format.json  {render json: {id: task.id, state: {title: task.title, description: task.description,
                                          link: task.link, value: task.value}}}
    end
  end

  def subject_new
    subject = SubjectArea.find(params[:id]).subject.new(data: {width: 200, left: 0, top: 0, height: 80,
      name: params[:name], watch: '0:0:0:0', haveBeenWatching: 0})
    subject.save
    respond_to do |format|
      format.json  {render json: {id: subject.id, state: subject.data, tasks: []}}
    end
  end

  def subject_area_new
    area = SubjectArea.new(data: {width: 300, left: 0, top: 0, height: 200,
      name: params[:name], color: '230,50,0', minHeight: 200, minWidth:300})
    area.save
    respond_to do |format|
      format.json  {render json: {id: area.id, state: area.data, subjects: []}}
    end
  end

  def got_task
    Task.find(params[:id]).update(
      id: params[:id].to_i,
      title: params[:title],
      description: params[:description],
      link: params[:link],
      value: params[:value]
    )
    render nothing: true
  end

  def got_subject
    Subject.find(params[:id]).update(data: {
      width:            params[:state][:width].to_i,
      left:             params[:state][:left].to_i,
      top:              params[:state][:top].to_i,
      height:           params[:state][:height].to_i,
      haveBeenWatching: params[:state][:haveBeenWatching].to_i,
      name:             params[:state][:name],
      watch:            params[:state][:watch]
    })
    render nothing: true
  end

  def subject_destroy
    Subject.find(params[:id]).destroy
    render nothing: true
  end

  def subject_area_destroy
    SubjectArea.find(params[:id]).destroy
    render nothing: true
  end

  def got_subject_area
    SubjectArea.find(params[:id]).update(data: {
      height:    params[:state][:height].to_i,
      width:     params[:state][:width].to_i,
      left:      params[:state][:left].to_i,
      top:       params[:state][:top].to_i,
      minHeight: params[:state][:minHeight].to_i,
      minWidth:  params[:state][:minWidth].to_i,
      color:     params[:state][:color],
      name:      params[:state][:name]
    })
    render nothing: true
  end
end
