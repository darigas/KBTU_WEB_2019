from rest_framework import serializers
from .models import TaskList, Task

class TaskListSerializer(serializers.Serializer):
    class Meta:
        model = TaskList
        fields = '__all__'

    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=255)

    def create(self, validated_data):
        task_list = TaskList(**validated_data)
        task_list.save()
        return task_list

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        return instance


class SimpleTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ('id', 'name', 'status')


class TaskSerializer(serializers.Serializer):
    class Meta:
        model = Task
        fields = '__all__'

    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=255)
    created_at = serializers.DateTimeField(required=True)
    due_on = serializers.DateTimeField(required=True)
    status = serializers.CharField(required=True)
    task_list = TaskListSerializer(read_only=True)

    def create(self, validated_data):
        task = Task(**validated_data)
        task.save()
        return task

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.created_at = validated_data.get('created_at', instance.created_at)
        instance.due_on = validated_data.get('due_on', instance.due_on)
        instance.status = validated_data.get('status', instance.status)
        instance.task_list = validated_data.get('task_list', instance.task_list)
        instance.save()
        return instance


