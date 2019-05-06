from django.shortcuts import render, render_to_response
from .serializers import TaskListSerializer, TaskSerializer, SimpleTaskSerializer, UserSerializer, \
    UserRegisterSerializer
from .models import Task, TaskList
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.authtoken.models import Token
from django.contrib.auth import logout


@api_view(['GET', 'POST'])
def list_of_tasks_lists(request):
    if request.method == "GET":
        tasks_list = TaskList.objects.filter(owner=request.user)
        serializer = TaskListSerializer(tasks_list, many=True)
        return Response(serializer.data)
        # return render_to_response('api/tasks_lists', {'data': serializer.data})

    elif request.method == "POST":
        serializer = TaskListSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(owner=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def list_of_tasks_lists_detail(request, pk):
    try:
        tasks_list = TaskList.objects.get(id=pk)
    except TaskList.DoesNotExist as error:
        return Response({'error': str(error)})

    if request.method == "GET":
        serializer = TaskListSerializer(tasks_list)
        return Response(serializer.data)

    elif request.method == "PUT":
        serializer = TaskListSerializer(instance=tasks_list, data=request.data)
        if serializer.is_valid():
            serializer.save(owner=request.user)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        tasks_list.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def tasks_list(request, pk):
    try:
        tasks_list = TaskList.objects.get(id=pk)
    except TaskList.DoesNotExist as error:
        return Response({'error': str(error)})

    if request.method == "GET":
        tasks = tasks_list.task_set.all()
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)

    elif request.method == "POST":
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(task_list=tasks_list)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUESTß)


@api_view(['GET', 'PUT', 'DELETE'])
def task_detail(request, pk):
    try:
        task = Task.objects.get(id = pk)
    except Task.DoesNotExist as error:
        return Response({"error": str(error)})

    if request.method == "GET":
        serializer = TaskSerializer(task)
        return Response(serializer.data)

    elif request.method == "PUT":
        serializer = TaskSerializer(instance=task, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        task.delete()
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login(request):
    serializer = AuthTokenSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data.get('user')
    token, created = Token.objects.get_or_create(user=user)
    print(user.username, token.key)
    return Response({'token': token.key})


@api_view(['POST'])
def logout(request):
    # request.auth.delete()
    request.user.auth_token.delete()
    return Response(status=status.HTTP_200_OK)


@api_view(['POST'])
def register(request):
    serializer = UserRegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        user.set_password(serializer.data['password'])
        user.save()
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key})
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
